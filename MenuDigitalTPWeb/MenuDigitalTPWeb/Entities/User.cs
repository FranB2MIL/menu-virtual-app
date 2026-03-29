using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MenuDigitalTPWeb.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string LocalName { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string BioImageUrl { get; set; } = string.Empty;
        public string Description {  get; set; } = string.Empty;
        public bool HappyHour { get; set; }
        public int Visits { get; set; } = 0;
        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
