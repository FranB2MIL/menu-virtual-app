namespace MenuDigitalTPWeb.Models.DTOs
{
    public class GetUserByIdDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }

        public string? LastName { get; set; }
        public string LocalName { get; set; }
        public string Description { get; set; }
        public string? Email { get; set; }
        public string ImageUrl { get; set; }
        public string BioImageUrl { get; set; }
        public bool HappyHour { get; set; }
    }
}
