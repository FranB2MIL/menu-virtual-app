using MenuDigitalTPWeb.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Mono.TextTemplating;

namespace MenuDigitalTPWeb.Data
{
    public class MenuDigitalTPWebContext : DbContext
    {
        public DbSet<User> Users { get; set; } // Esto le va a decir a Entity Framework que va a tener una tabla que guarda registros de esa entidad
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public MenuDigitalTPWebContext(DbContextOptions<MenuDigitalTPWebContext> options) : base(options) //Acá estamos llamando al constructor de DbContext que es el que acepta las opciones
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.User)
                .WithMany(u => u.Products)
                .HasForeignKey(p => p.UserId);

            var user = new User
            {
                Id = 1,
                FirstName = "Luis",
                LastName = "Pérez",
                LocalName = "Vinoteca Don Luis",
                ImageUrl = "https://ejemplo.com/imagen.jpg",
                BioImageUrl = "https://ejemplo.com/bio.jpg",
                Description = "Apasionado por los vinos y la buena atención.",
                Password = "12345",
                Email = "luis@ejemplo.com"
            };

            var vinos = new Category
            {
                Id = 1,
                Name = "Vinos",
                
            };

            var espumantes = new Category
            {
                Id = 2,
                Name = "Espumantes",
                
            };

            var vino1 = new Product
            {
                Id = 1,
                Name = "Malbec Reserva",
                Price = "8500.00M",
                Description = "Un Malbec intenso con notas de ciruela y madera.",
                ImageUrl = "https://ejemplo.com/malbec.jpg",
                Descuento = 10,
                UserId = 1,
                CategoryId = vinos.Id
            };

            var vino2 = new Product
            {
                Id = 2,
                Name = "Cabernet Sauvignon",
                Price = "9200.00M",
                Description = "Aromas a frutos rojos y un toque especiado.",
                ImageUrl = "https://ejemplo.com/cabernet.jpg",
                Descuento = 5,
                UserId = 1,
                CategoryId = vinos.Id
            };

            var espumante1 = new Product
            {
                Id = 3,
                Name = "Champagne Brut Nature",
                Price = "11500.00M",
                Description = "Elegante y seco, con burbujas finas y persistentes.",
                ImageUrl = "https://ejemplo.com/champagne.jpg",
                Descuento = 0,
                UserId = 1,
                CategoryId = espumantes.Id
            };

            modelBuilder.Entity<User>().HasData(user);
            modelBuilder.Entity<Category>().HasData(vinos, espumantes);
            modelBuilder.Entity<Product>().HasData(vino1, vino2, espumante1);


            base.OnModelCreating(modelBuilder);
        }
    }
}
