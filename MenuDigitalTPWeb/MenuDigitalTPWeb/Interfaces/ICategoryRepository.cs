using MenuDigitalTPWeb.Entities;

namespace MenuDigitalTPWeb.Interfaces
{
    public interface ICategoryRepository
    {
        //public List<Category> GetAllCategories();

        int Create(Category newCategory);
        //public List<Producto> GetCategoryProducts(int id);
        void Delete(int categoryId);
    }
}
