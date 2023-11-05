namespace user_service.Services
{
    public class UserService : IUserService
    {
        private readonly UserContext _userContext = new ();

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

        public UserEntity GetUser(string emailOrUsername, string password)
        {
            var user = _userContext.Users
                .Where(u => u.Email.Equals(emailOrUsername) || u.Username.Equals(emailOrUsername)).First();
            return user;
        }
    }
}
