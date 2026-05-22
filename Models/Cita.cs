using System.ComponentModel.DataAnnotations.Schema;

namespace VetApp.Models
{
    public class Cita
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Motivo { get; set; } = string.Empty;

        public int VeterinarioId { get; set; }
        public Veterinario? Veterinario { get; set; }

        public int MascotaId { get; set; }
        public Mascota? Mascota { get; set; }
    }
}