using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace MenuDigitalTPWeb.Interfaces
{
    public interface IUserRepository
    {
        bool CheckIfUserExists(int userId);
        int Create(User newUser);
        List<User> GetAll();
        User? GetById(int userId);
        void RemoveUser(int userId);
        void Update(User updatedUser, int userId);
        User? Validate(AuthDto authRequestBody);
        IEnumerable<Category> GetCategories(int userId);
        IEnumerable<Product> GetUserProductsByCategory(int userId, int categoryId);
        User? GetByEmail(string email);
        bool UpdateHappyHour(int userId, bool value);
        IEnumerable<RestaurantVisitsDto> GetVisitsReport();
    }
}
