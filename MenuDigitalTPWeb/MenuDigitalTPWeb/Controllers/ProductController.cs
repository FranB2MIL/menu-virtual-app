using MenuDigitalTPWeb.Interfaces;
using MenuDigitalTPWeb.Models.DTOs;
using MenuDigitalTPWeb.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MenuDigitalTPWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IConfiguration _config;
        public ProductController(IProductService productService, IConfiguration config)
        {
            _productService = productService;
            _config = config;
        }

        [HttpGet("all/{userId}")]
        [AllowAnonymous]
        public ActionResult<ProductDto> GetAll(int userId)
        {
            
            return Ok(_productService.GetAll(userId));
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetOneById(int id)
        {
            var product = _productService.GetById(id);

            if (product == null)
            {
                return NotFound(new { message = $"No se encontró un producto con el ID {id}." });
            }
            return Ok(product);
        }
            
        [HttpPost]      //dudas y mas dudas
        [AllowAnonymous]
        public IActionResult CreateProduct(CreateAndUpdateProductDto dto)
        {

            int userId = int.Parse(User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "");

            ProductDto response = null;
            try
            {
                response = _productService.Create(dto, userId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return Created("Created", response);
        }

        [HttpPut("{productId}")]
        public IActionResult UpdateProduct(CreateAndUpdateProductDto dto, int productId)
        {
            if (!_productService.CheckIfProductExists(productId))
            {
                return NotFound();
            }
            try
            {
                _productService.Update(dto, productId);
            }
            catch (Exception ex) { return BadRequest(ex); }
            return NoContent();

        }
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                _productService.RemoveProduct(id);
            }
            catch (Exception ex)
            {
                BadRequest(ex);
            }

            return NoContent();
        }


        [HttpGet("export/{restaurantId}")]
        public IActionResult ExportToCsv(int restaurantId)
        {
            var csvBytes = _productService.ExportProductsToCsv(restaurantId);

            return File(
                csvBytes,
                "text/csv",
                $"restaurant_{restaurantId}_products.csv"
            );
        }

    }
}
