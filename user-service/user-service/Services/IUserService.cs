namespace user_service.Services
{
    public interface IUserService
    {
        public void RegisterUser(User user);

        public UserEntity GetUser(string emailOrUsername, string password);
    }
}
