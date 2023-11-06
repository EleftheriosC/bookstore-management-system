using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using user_service.RequestModels;

namespace user_service.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<UserIdentity> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthenticationService> _logger;

        public AuthenticationService(
            UserManager<UserIdentity> userManager,
            IConfiguration configuration,
            ILogger<AuthenticationService> logger)
        {
            _userManager = userManager;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<string> Register(RegisterRequest registerRequest)
        {
            _logger.LogInformation("Attempting to register user");

            var userByEmail = await _userManager.FindByNameAsync(registerRequest.Email);
            var userByUsername = await _userManager.FindByNameAsync(registerRequest.Username);

            var userExists = userByEmail is not null || userByUsername is not null;

            if (userExists)
            {
                _logger.LogError($"User already registered with with email {registerRequest.Email} or username {registerRequest.Username}");
                throw new ArgumentException($"User with email {registerRequest.Email} or username {registerRequest.Username} already exists.");
            }

            UserIdentity userIdentity = new UserIdentity
            {
                Email = registerRequest.Email,
                UserName = registerRequest.Username,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var response = await _userManager.CreateAsync(userIdentity, registerRequest.Password);

            if (!response.Succeeded)
            {
                _logger.LogError($"User registration failed with error {IsoalteErros(response.Errors)}");
                throw new ArgumentException($"Unable to register user with {registerRequest.Username} with error {IsoalteErros(response.Errors)} already exists.");
            }

            var loginRequest = new LoginRequest
            {
                Username = registerRequest.Email,
                Password = registerRequest.Password,
            };
            _logger.LogInformation($"User with username {registerRequest.Username} registered succesfully");

            return await Login(loginRequest);
        }

        public async Task<string> Login(LoginRequest loginRequest)
        {
            _logger.LogInformation("Attempting to login user");

            var userIdentity = await _userManager.FindByNameAsync(loginRequest.Username);

            if (userIdentity == null)
            {
                _logger.LogInformation("No user found by username, searching by email");
                userIdentity = await _userManager.FindByEmailAsync(loginRequest.Username);
            }

            var userFailedAuthentication = userIdentity is null || !await _userManager.CheckPasswordAsync(userIdentity, loginRequest.Password);

            if (userFailedAuthentication)
            {
                _logger.LogError($"User {loginRequest.Username} authentication failed");
                throw new ArgumentException($"Unable to authenticate user with username {loginRequest.Username}");
            }

            var authClaims = new List<Claim>
            {
                new (ClaimTypes.Name, userIdentity.UserName),
                new (ClaimTypes.Email, userIdentity.Email),
                new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = GenerateToken(authClaims);

            _logger.LogInformation($"User with username {loginRequest.Username} authenticated succesfully");

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string IsoalteErros(IEnumerable<IdentityError> errors)
        {
            return string.Join(", ", errors.Select(error => error.Description).ToArray());
        }

        private JwtSecurityToken GenerateToken(IEnumerable<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var generatedToken = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(5),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            return generatedToken;
        }

    }
}
