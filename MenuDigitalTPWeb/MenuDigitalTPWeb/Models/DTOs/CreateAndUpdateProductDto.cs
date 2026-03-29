namespace MenuDigitalTPWeb.Models.DTOs
{
    public class CreateAndUpdateProductDto
    {
        public string Name { get; set; }
        public string Price { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int Descuento { get; set; }

        public int CategoryId { get; set; }
          
    }
}
