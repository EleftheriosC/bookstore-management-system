using System.Security.Cryptography;

namespace user_service.Services
{
    public class UserService : IUserService
    {
        private readonly UserContext _userContext = new ();
        private readonly ILogger<UserService> _logger;

        public UserService(ILogger<UserService> logger)
        {
            _logger = logger;
        }

        public void RegisterUser(User user)
        {
            var userExists = _userContext.Users
                .Where(u => u.Email.Equals(user.Email) || u.Username.Equals(user.Username)).Count() > 0;

            if (userExists)
            {
                return;
            }

            byte[] salt = new byte[16];
            RandomNumberGenerator.Create().GetBytes(salt);

            var pbkdf2 = new Rfc2898DeriveBytes(user.Password, salt, 10000);

            byte[] hash = pbkdf2.GetBytes(32);

            var hashString = Convert.ToBase64String(hash);
            var saltString = Convert.ToBase64String(salt);

            _userContext.Add(new UserEntity
            {
                Username = user.Username,
                Email = user.Email,
                PasswordHash = hashString,
                Salt = saltString
            });
            _userContext.SaveChanges();
        }

        public UserEntity GetUser(string emailOrUsername)
        {
            var user = _userContext.Users
                .Where(u => u.Email.Equals(emailOrUsername) || u.Username.Equals(emailOrUsername)).First();
            return user;
        }

        public LoginResponse Login(string emailOrUsername, string password)
        {
            var user = _userContext.Users
                .Where(u => u.Email.Equals(emailOrUsername) || u.Username.Equals(emailOrUsername)).First();

            byte[] salt = Convert.FromBase64String(user.Salt);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);

            byte[] hash = pbkdf2.GetBytes(32);
            string generatedHash = Convert.ToBase64String(hash);

            return new LoginResponse(generatedHash == user.PasswordHash);

        }

    }
}
