using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Interfaces;
using MenuDigitalTPWeb.Models.DTOs;
using MenuDigitalTPWeb.Repositories;
using Mono.TextTemplating;

namespace MenuDigitalTPWeb.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public bool CheckIfUserExist(int userId)
        {
            var check = _userRepository.CheckIfUserExists(userId);
            if (check) return true;
            return false;
        }

        public UserDto Create(CreateUserDto dto)
        {
            User newUser = new User()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                LocalName = dto.LocalName,
                //ImageUrl = dto.ImageUrl,
                //Description = dto.Description,
                Email = dto.Email,
                Password = dto.Password
            };
            int newId = _userRepository.Create(newUser);
            UserDto newUserDto = new UserDto(newId, newUser.FirstName, newUser.LastName, newUser.LocalName, newUser.Description, newUser.ImageUrl,newUser.BioImageUrl, newUser.Email);
            return newUserDto;
        }

        public IEnumerable<UserDto> GetAll()
        {
            return _userRepository.GetAll().Select(u => new UserDto(u.Id, u.FirstName, u.LastName, u.LocalName, u.Description, u.ImageUrl, u.BioImageUrl, u.Email));

        }

        public GetUserByIdDto? GetById(int userId)
        {
            var user = _userRepository.GetById(userId);

            if(user == null) return null;

            return new GetUserByIdDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName, 
                LocalName = user.LocalName,
                BioImageUrl = user.BioImageUrl,
                Email = user.Email,
                ImageUrl = user.ImageUrl,
                Description = user.Description,
                HappyHour = user.HappyHour,
            };
        }

        public IEnumerable<Category> GetCategories(int userId)
        {
            return _userRepository.GetCategories(userId);
        }

        public IEnumerable<Product> GetUserProductsByCategory(int userId, int categoryId)
        {
            return _userRepository.GetUserProductsByCategory(userId, categoryId);
        }

        public void RemoveUser(int userId)
        {
            _userRepository.RemoveUser(userId);
            //throw new NotImplementedException();
        }

        public void UpdateUser(UpdateUserDto dto, int userId)
        {
            var user = new User()
            {
                LastName = dto.LastName,
                FirstName = dto.FirstName,
                LocalName = dto.LocalName,
                Description = dto.Description,
                Password = dto.Password,
                ImageUrl = dto.ImageUrl,
                BioImageUrl = dto.BioImageUrl,
                Email = dto.Email,

            };
            _userRepository.Update(user, userId);
        }
        public bool UpdateHappyHour(int userId, bool value)
        {
             return _userRepository.UpdateHappyHour(userId, value);
        }

        public User? Validate(AuthDto authDto)
        {
            User? result = null;

            if (!string.IsNullOrEmpty(authDto.Email) && !string.IsNullOrEmpty(authDto.Password)) //verifico que no sean null (no deberían por definición) ni que sea un string vacío
                result = _userRepository.Validate(authRequestBody: new AuthDto(authDto.Email, authDto.Password));
            return result;
        }

        public void TrackVisit(int id)
        {
            var user = _userRepository.GetById(id);
            if(user == null)
            {
                throw new Exception("Restaurant not found.");
            }
            
        }

        public IEnumerable<RestaurantVisitsDto> GetVisitsReport()
        {
            return _userRepository.GetVisitsReport();
        }



        
    }
}
