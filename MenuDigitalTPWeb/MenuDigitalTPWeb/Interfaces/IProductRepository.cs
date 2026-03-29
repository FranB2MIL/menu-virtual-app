using MenuDigitalTPWeb.Entities;

namespace MenuDigitalTPWeb.Interfaces
{
    public interface IProductRepository
    {
        bool CheckIfProductExists(int productId);
        int Create(Product newProduct);
        List<Product> GetAll(int userId);
        Product? GetById(int productId);
        void RemoveProduct(int productId);
        void Update(Product updatedProduct, int productId);
    }
}
