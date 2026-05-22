using Microsoft.EntityFrameworkCore;
using VetApp.Models;

namespace VetApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Veterinario> Veterinarios { get; set; }
        public DbSet<Mascota> Mascotas { get; set; }
        public DbSet<Cita> Citas { get; set; }

        // Datos de prueba que se insertan automáticamente al crear la base de datos
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Veterinario>().HasData(
                new Veterinario { Id = 1, Nombre = "Dr. Carlos Ramírez", Especialidad = "Cirugía", Telefono = "6641234567" },
                new Veterinario { Id = 2, Nombre = "Dra. Laura Méndez", Especialidad = "Dermatología", Telefono = "6649876543" },
                new Veterinario { Id = 3, Nombre = "Dr. Pedro Soto", Especialidad = "Nutrición", Telefono = "6645554433" }
            );

            modelBuilder.Entity<Mascota>().HasData(
                new Mascota { Id = 1, Nombre = "Max", Especie = "Perro", Raza = "Labrador", NombreDueno = "Juan García" },
                new Mascota { Id = 2, Nombre = "Luna", Especie = "Gato", Raza = "Siamés", NombreDueno = "María López" },
                new Mascota { Id = 3, Nombre = "Rocky", Especie = "Perro", Raza = "Bulldog", NombreDueno = "Carlos Torres" }
            );

            modelBuilder.Entity<Cita>().HasData(
                new Cita { Id = 1, Fecha = new DateTime(2026, 5, 20), Motivo = "Revisión general", VeterinarioId = 1, MascotaId = 1 },
                new Cita { Id = 2, Fecha = new DateTime(2026, 5, 21), Motivo = "Vacunación anual", VeterinarioId = 2, MascotaId = 2 },
                new Cita { Id = 3, Fecha = new DateTime(2026, 5, 22), Motivo = "Control de peso", VeterinarioId = 3, MascotaId = 3 }
            );
        }
    }
}