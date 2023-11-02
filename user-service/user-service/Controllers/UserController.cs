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
        [Route("RegisterUser")]
        public void RegisterUser(User user)
        {

            _userContext.Add(new UserEntity
            {
                Username = user.Username,
                Email = user.Email,
                Password = user.Password
            });
            _userContext.SaveChanges();
        }
    }
}