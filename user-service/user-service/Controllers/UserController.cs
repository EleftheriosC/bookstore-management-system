using Microsoft.AspNetCore.Mvc;
using user_service.Services;

namespace user_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost]
        [Route("/register")]
        public void RegisterUser(User user)
        {
            _userService.RegisterUser(user);
        }

        [HttpPost]
        [Route("/login")]
        public LoginResponse LoginUser(string emailOrUsername, string password)
        {
           var response = _userService.Login(emailOrUsername, password);

            return response;
        }

        [HttpGet]
        [Route("")]
        public UserEntity GetUser(string emailOrUsername)
        {
            return _userService.GetUser(emailOrUsername);
        }
    }
}