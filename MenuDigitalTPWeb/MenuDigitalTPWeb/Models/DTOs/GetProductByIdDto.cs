namespace MenuDigitalTPWeb.Models.DTOs
{
    public class GetProductByIdDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public int Descuento { get; set; }
        public string ImageUrl { get; set; }


    }
}
