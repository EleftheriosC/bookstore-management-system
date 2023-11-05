using user_service.RequestModels;

namespace user_service.Services;

    public interface IAuthenticationService
    {
    Task<string> Register(RegisterRequest registerRequest);
    Task<string> Login(LoginRequest loginRequest);
    }

