namespace VetApp.Models
{
    // Representa a un veterinario registrado en el sistema
    public class Veterinario
    {
        public int Id { get; set; }

        // Nombre completo del veterinario
        public string Nombre { get; set; } = string.Empty;

        // Área médica en la que se especializa
        public string Especialidad { get; set; } = string.Empty;

        // Número de contacto del veterinario
        public string Telefono { get; set; } = string.Empty;
    }
}