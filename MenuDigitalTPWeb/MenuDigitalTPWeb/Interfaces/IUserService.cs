using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Models.DTOs;

namespace MenuDigitalTPWeb.Interfaces
{
    public interface IUserService
    {
        bool CheckIfUserExist(int uderId);
        UserDto Create(CreateUserDto dto);
        IEnumerable<UserDto> GetAll();
        GetUserByIdDto? GetById(int userId);
        void RemoveUser(int userId);
        void UpdateUser(UpdateUserDto dto, int userId);
        User? Validate(AuthDto authDto);
        IEnumerable<Category> GetCategories(int userId);
        IEnumerable<Product> GetUserProductsByCategory(int userId, int categoryId);
        bool UpdateHappyHour(int userId, bool value);
        void TrackVisit(int id);
        IEnumerable<RestaurantVisitsDto> GetVisitsReport();



    }
}
