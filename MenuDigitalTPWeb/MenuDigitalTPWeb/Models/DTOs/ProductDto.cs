using MenuDigitalTPWeb.Entities;

namespace MenuDigitalTPWeb.Models.DTOs
{
    public record ProductDto(int Id, string Name, string Price, string Description,int Discount, string ImageUrl);
}
