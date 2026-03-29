using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Interfaces;
using MenuDigitalTPWeb.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace MenuDigitalTPWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
      
        public UserController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<UserDto> GetAll()
        {
            return Ok(_userService.GetAll());
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetOneById(int id)
        {

            var user = _userService.GetById(id);



            if (user == null)
            {
                return NotFound(new { message = $"No se encontró un usuario con el ID {id}." });
            }
            return Ok(user);
        }

        [HttpPost]      
        [AllowAnonymous]
        public IActionResult CreateUser(CreateUserDto dto)
        {
            UserDto response = null;
            try
            {
                response = _userService.Create(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return Created("Created", response);
        }

        [HttpPut("{userId}")]
        public IActionResult UpdateUser(UpdateUserDto dto, int userId)
        {
            if (!_userService.CheckIfUserExist(userId))
            {
                return NotFound();
            }
            try
            {
                _userService.UpdateUser(dto, userId);
            }
            catch (Exception ex) { return BadRequest(ex); }
            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                _userService.RemoveUser(id);
            }
            catch (Exception ex)
            {
                BadRequest(ex);
            }

            return NoContent();
        }

        [HttpGet("{id}/category")]
        [AllowAnonymous]
        public IActionResult GetCategories(int id)
        {
            return Ok(_userService.GetCategories(id));
        }

        [HttpGet("{userId}/category/{categoryId}/product")]
        [AllowAnonymous]
        public IActionResult GetUserProductsByCategory(int userId, int categoryId)
        {
            return Ok(_userService.GetUserProductsByCategory(userId, categoryId));
        }

        [HttpGet("me")]
        public ActionResult<GetUserByIdDto> GetCurrentUser()
        {
            int userId = int.Parse(User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "");
            ////int userId = Int32.Parse(HttpContext.User.Claims.FirstOrDefault(x => x.Type.Contains("sub"))!.Value);
            var user = _userService.GetById(userId);
            return Ok(user);




        }

        [HttpPut("{id}/happy")]
        public IActionResult UpdateHappyHour(int id, [FromBody] UpdateHappyHour dto)
        {
            
            var result = _userService.UpdateHappyHour(id, dto.HappyHour);

            if (!result)
                return NotFound($"User with id {id} not found");

            return Ok(new { success = true, value = dto.HappyHour });
        }

        [HttpGet("visits")]
        [AllowAnonymous]
        public ActionResult GetVisitsReport()
        {
            var report = _userService.GetVisitsReport();
          

            return Ok(report);
        }
    }
}
