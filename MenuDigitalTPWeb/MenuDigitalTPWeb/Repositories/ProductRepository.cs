using MenuDigitalTPWeb.Data;
using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Interfaces;

namespace MenuDigitalTPWeb.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly MenuDigitalTPWebContext _context;
        public ProductRepository(MenuDigitalTPWebContext context)
        {
            _context = context;
        }
        public bool CheckIfProductExists(int productId)
        {
            return _context.Products.Any(u => u.Id == productId);
        }

        public int Create(Product newProduct)
        {
            _context.Products.Add(newProduct);
            _context.SaveChanges();
            return newProduct.Id;
        }

        public List<Product> GetAll(int userId)
        {
            return _context.Products.Where(p => p.UserId == userId).ToList();
        }

        public Product? GetById(int productId)
        {
            return _context.Products.FirstOrDefault(p => p.Id == productId);
        }

        public void RemoveProduct(int productId)
        {
            var product = _context.Products.FirstOrDefault(u => u.Id == productId);
            if (product != null)
            {
                _context.Remove(product);
            }
            _context.SaveChanges();
        }

        public void Update(Product updatedProduct, int productId)
        {
            var existingProduct = GetById(productId);
            if (existingProduct != null)
            {
                existingProduct.Name = updatedProduct.Name;
                existingProduct.Price = updatedProduct.Price;
                existingProduct.ImageUrl = updatedProduct.ImageUrl;
                existingProduct.Descuento = updatedProduct.Descuento;
                existingProduct.Description = updatedProduct.Description;

                _context.SaveChanges();
            }
        }
    }
}
