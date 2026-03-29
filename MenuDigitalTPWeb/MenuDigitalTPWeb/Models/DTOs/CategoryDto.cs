namespace MenuDigitalTPWeb.Models.DTOs
{
    //public class CategoryDto
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }

    //}
    public record CategoryDto(int Id, string Name, int? userId);
}
