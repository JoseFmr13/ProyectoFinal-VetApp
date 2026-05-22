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
    }
}