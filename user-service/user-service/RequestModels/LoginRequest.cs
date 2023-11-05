﻿using System.ComponentModel.DataAnnotations;

namespace user_service.RequestModels
{
    public class LoginRequest
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
