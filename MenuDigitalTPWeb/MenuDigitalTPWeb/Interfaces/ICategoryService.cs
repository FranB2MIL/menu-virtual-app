using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Models.DTOs;

namespace MenuDigitalTPWeb.Interfaces
{
    public interface ICategoryService
    {
        //public List<Category> GetAllCategories();
        CategoryDto Create(CreateAndUpdateCategoryDto category);
        void Delete(int categoryId);
    }
}
