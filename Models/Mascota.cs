namespace VetApp.Models
{
    public class Mascota
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Especie { get; set; } = string.Empty;
        public string Raza { get; set; } = string.Empty;
        public string NombreDueno { get; set; } = string.Empty;
    }
}
