using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Interfaces;
using MenuDigitalTPWeb.Models.DTOs;
using MenuDigitalTPWeb.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MenuDigitalTPWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IConfiguration _config;
        public CategoryController(ICategoryService categoryService, IConfiguration config)
        {
            _categoryService = categoryService;
            _config = config;
        }
        
        
        
        //dudas y mas dudas
        [HttpPost]
        public IActionResult CreateCategory(CreateAndUpdateCategoryDto category)
        {
            CategoryDto response = null;
            try
            {
                response = _categoryService.Create(category);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return Created("Created", response);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                _categoryService.Delete(id);
            }
            catch (Exception ex)
            {
                BadRequest(ex);
            }

            return NoContent();
        }
    }
}
