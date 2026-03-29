using Humanizer;
using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Interfaces;
using MenuDigitalTPWeb.Models.DTOs;
using MenuDigitalTPWeb.Repositories;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text;

namespace MenuDigitalTPWeb.Services
{
    public class ProductService : IProductService
    {
        private IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public bool CheckIfProductExists(int productId)
        {
            var check = _productRepository.CheckIfProductExists(productId);
            if (check) return true;
            return false;
        }

        public ProductDto Create(CreateAndUpdateProductDto dto, int userId)
        {
            Product newProduct = new Product()
            {
                Name = dto.Name,
                Price = dto.Price,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,
                CategoryId = dto.CategoryId,
                Descuento = dto.Descuento,
                UserId = userId
            };
            int newId = _productRepository.Create(newProduct);
            ProductDto newProductDto = new ProductDto(newId, newProduct.Name, newProduct.Price, newProduct.Description, newProduct.Descuento, newProduct.ImageUrl);
            return newProductDto;
        }

        public IEnumerable<ProductDto> GetAll(int userId)
        {
            return _productRepository.GetAll(userId).Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Description, p.Descuento, p.ImageUrl));
        }

        public GetProductByIdDto GetById(int productId)
        {
            var product = _productRepository.GetById(productId);

            if (product == null) return null;
            return new GetProductByIdDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price= product.Price,
                Descuento = product.Descuento,
                ImageUrl = product.ImageUrl
            };
        }

        public void RemoveProduct(int productId)
        {
            _productRepository.RemoveProduct(productId);
        }

        public void Update(CreateAndUpdateProductDto dto, int productId)
        {
            var product = new Product()
            {
                Name = dto.Name,
                Price = dto.Price,
                Description = dto.Description,
                Descuento = dto.Descuento,
                ImageUrl = dto.ImageUrl
            };
            _productRepository.Update(product, productId);
        }
        public byte[] ExportProductsToCsv(int restaurantId)
        {
            var products = _productRepository.GetAll(restaurantId);

            var sb = new StringBuilder();

            sb.AppendLine("Id,Name,Price,Discount,FinalPrice");

            foreach (var p in products)
            {
                var finalPrice = int.Parse(p.Price) - (int.Parse(p.Price) * p.Descuento / 100);

                sb.AppendLine($"{p.Id},{p.Name},{p.Price},{p.Descuento},{finalPrice}");
            }

            return Encoding.UTF8.GetBytes(sb.ToString());
        }


    }
}
