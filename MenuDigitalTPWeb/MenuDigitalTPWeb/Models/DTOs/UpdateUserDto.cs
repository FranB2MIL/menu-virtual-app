namespace MenuDigitalTPWeb.Models.DTOs
{
    public class UpdateUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LocalName { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string BioImageUrl {  get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
