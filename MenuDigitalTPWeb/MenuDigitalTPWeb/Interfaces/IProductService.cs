using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Models.DTOs;

namespace MenuDigitalTPWeb.Interfaces
{
    public interface IProductService
    {
        bool CheckIfProductExists(int productId);
        ProductDto Create(CreateAndUpdateProductDto newProduct, int userId);
        IEnumerable<ProductDto> GetAll(int userId);
        GetProductByIdDto? GetById(int productId);
        void RemoveProduct(int productId);
        void Update(CreateAndUpdateProductDto dto, int productId);
        byte[] ExportProductsToCsv(int restaurantId);
    }
}
