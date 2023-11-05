namespace user_service
{
    public class LoginResponse
    {
        public LoginResponse(Boolean userAuthorised)
        {
            UserAuthorised = userAuthorised;
        }
        public Boolean UserAuthorised { get; set; }
    }
}