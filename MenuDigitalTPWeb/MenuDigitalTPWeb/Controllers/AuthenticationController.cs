using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Interfaces;
using MenuDigitalTPWeb.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MenuDigitalTPWeb.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IConfiguration _config;


    public AuthenticationController(IUserService userService, IConfiguration config)
    {
        _userService = userService;
        _config = config;
    }

    [HttpPost]
    public IActionResult Authenticate([FromBody] AuthDto authDto)
    {
        User? user = _userService.Validate(authDto);

        if (user is not null)
        {
            var securityPassword = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["Authentication:SecretForKey"]));

            var signature = new SigningCredentials(securityPassword, SecurityAlgorithms.HmacSha256);

            var claimsForToken = new List<Claim>
            {
                new Claim("sub", user.Id.ToString()),
                new Claim("email", user.Email ?? ""),
                new Claim("localName", user.LocalName ?? "")
            };

            var jwtSecurityToken = new JwtSecurityToken(
                _config["Authentication:Issuer"],
                _config["Authentication:Audience"],
                claimsForToken,
                DateTime.UtcNow,
                DateTime.UtcNow.AddHours(1),
                signature
            );

            var tokenToReturn = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            //return Ok(new
            //{
            //    token = tokenToReturn,
            //    id = user.Id,
            //    email = user.Email,
            //    localName = user.LocalName
            //});
            return Ok(tokenToReturn);
        }

        return Unauthorized();
    }
}
