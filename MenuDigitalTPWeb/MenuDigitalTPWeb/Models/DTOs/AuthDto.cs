using System.ComponentModel.DataAnnotations;

namespace MenuDigitalTPWeb.Models.DTOs
{
    public record AuthDto([Required] string Email, [Required] string Password);
}
