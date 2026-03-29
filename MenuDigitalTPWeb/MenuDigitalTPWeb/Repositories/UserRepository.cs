using MenuDigitalTPWeb.Data;
using MenuDigitalTPWeb.Entities;
using MenuDigitalTPWeb.Interfaces;
using MenuDigitalTPWeb.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace MenuDigitalTPWeb.Repositories
{
    public class UserRepository : IUserRepository
    {
        
        private readonly MenuDigitalTPWebContext _context;

        public UserRepository(MenuDigitalTPWebContext context)
        {
            _context = context;
        }
        public bool CheckIfUserExists(int userId)
        {
            return _context.Users.Any(u => u.Id == userId);
        }

        public int Create(User newUser)
        {
            _context.Users.Add(newUser);
            _context.SaveChanges();
            return newUser.Id;
        }

        public List<User> GetAll()
        {
            return _context.Users.ToList();
        }

        public User? GetById(int userId)

        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            user.Visits++;
            _context.SaveChanges();
            //return _context.Users.FirstOrDefault(u => u.Id == userId);
            return user;
        }

        public void RemoveUser(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user != null)
            {
                _context.Remove(user);
            }
            _context.SaveChanges();
        }

        public void Update(User updatedUser, int userId)
        {
            var existingUser = GetById(userId);
            if (existingUser != null)
            {
                existingUser.FirstName = updatedUser.FirstName;
                existingUser.LastName = updatedUser.LastName;
                existingUser.LocalName = updatedUser.LocalName;
                existingUser.ImageUrl = updatedUser.ImageUrl;
                existingUser.BioImageUrl = updatedUser.BioImageUrl;
                existingUser.Description = updatedUser.Description;
                existingUser.Email = updatedUser.Email;

                _context.SaveChanges();
            }
        }

        public bool UpdateHappyHour(int userId, bool value)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (existingUser != null) 
            {
                existingUser.HappyHour = value;
                _context.SaveChanges();
                return true;
            }
            return false;
        }
        public User? Validate(AuthDto authDto)
        {
            return _context.Users.FirstOrDefault(p => p.Email == authDto.Email && p.Password == authDto.Password);
        }

        public IEnumerable<Category> GetCategories(int userId)
        {
            //return _context.Users.FirstOrDefault(u => u.Id == userId).Products.Select(p => p.Category).DistinctBy(c => c.Id).ToList();
            //return _context.Products.Where(p => p.UserId == userId).Select(p => p.Category);
            return _context.Categories.Where(c => c.UserId == userId).ToList();

        }

        public IEnumerable<Product> GetUserProductsByCategory(int userId,  int categoryId)
        {
            //return _context.Users.Include(u => u.Products).FirstOrDefault(u => u.Id == userId).Products.Where(p => p.CategoryId == categoryId);
            return _context.Products.Where(p => p.Category.Id == categoryId && p.UserId == userId);
            //var user = _context.Users.Single(u => u.Id == userId);
            //    var prods = user.Products.Where(p => p.CategoryId == categoryId);
            //return prods;
        }

        public User? GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
        }
        // Restaurants o User: va a tener username y password para loguearse
        // Categories: va a tener una lista de Products
        // CategoriesController GetCategories(int userId) Ir a buscar las categorias sacando el UserId de las claims
        // Products: pertenece a una categoria 
    
        public IEnumerable<RestaurantVisitsDto> GetVisitsReport()
        {
            return _context.Users.Select(u => new RestaurantVisitsDto
            {
                Id = u.Id,
                Name = u.LocalName,
                Visits = u.Visits
            }).ToList();
        }
    }
}
