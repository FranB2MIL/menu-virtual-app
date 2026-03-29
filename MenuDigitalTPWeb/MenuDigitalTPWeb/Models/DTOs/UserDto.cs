namespace MenuDigitalTPWeb.Models.DTOs
{
    public record UserDto(int Id, string FirstName, string LastName, string LocalName, string Description, string ImageUrl, string BioImageUrl, string Email);
}
