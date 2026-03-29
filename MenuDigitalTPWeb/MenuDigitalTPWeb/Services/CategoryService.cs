using Humanizer;
using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Interfaces;
using MenuDigitalTPWeb.Models.DTOs;
using MenuDigitalTPWeb.Repositories;

namespace MenuDigitalTPWeb.Services
{
    public class CategoryService : ICategoryService
    {
        private ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        //public List<Category> GetAllCategories()
        //{
        //    throw new NotImplementedException();
        //}
        public CategoryDto Create(CreateAndUpdateCategoryDto category)
        {
            Category newCategory = new Category()
            {
                Name = category.Name,
                UserId = category.UserId
            };
            int newId = _categoryRepository.Create(newCategory);
            CategoryDto newCategoryDto = new CategoryDto(newId, newCategory.Name, newCategory.UserId); 
            return newCategoryDto;
            
        } 
        public void Delete(int categoryId)
        {
            _categoryRepository.Delete(categoryId);
        }
    }
}
