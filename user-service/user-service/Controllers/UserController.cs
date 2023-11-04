using Microsoft.AspNetCore.Mvc;

namespace user_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly UserContext _userContext = new UserContext();

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("")]
        public void RegisterUser(User user)
        {

            var userExists = _userContext.Users
                .Where(u => u.Email.Equals(user.Email) || u.Username.Equals(user.Username)).Count() > 0;

            if (userExists)
            {
                return;
            }

            _userContext.Add(new UserEntity
            {
                Username = user.Username,
                Email = user.Email,
                Password = user.Password
            });
            _userContext.SaveChanges();
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<UserEntity> Login(string emailOrUsername, string password)
        {
            var user = _userContext.Users
                .Where(u => u.Email.Equals(emailOrUsername) || u.Username.Equals(emailOrUsername));
            return user;
        }
    }
}