using MenuDigitalTPWeb.Data;
using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Interfaces;

namespace MenuDigitalTPWeb.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly MenuDigitalTPWebContext _context;
        public CategoryRepository(MenuDigitalTPWebContext context)
        {
            _context = context;
        }
        //public List<Category> GetAllCategories()
        //{
        //    return _context.Products.Select(p => p.Category).ToList();
        //}
        public int Create(Category newCategory)
        {
            _context.Categories.Add(newCategory);
            _context.SaveChanges();
            return newCategory.Id;
        }
        public void Delete(int categoryId)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == categoryId);
            if (category != null)
            {
                _context.Remove(category);
            }
            _context.SaveChanges();
        }
        //public List<Producto> GetCategoryProducts(int id)
        //{
        //    return _context.
        //}
    }
}
