using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VetApp.Data;
using VetApp.Models;

namespace VetApp.Controllers
{
    // Controlador para gestionar las citas veterinarias
    [ApiController]
    [Route("api/[controller]")]
    public class CitaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CitaController(AppDbContext context)
        {
            _context = context;
        }

        // Obtener todas las citas incluyendo datos de veterinario y mascota
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var citas = await _context.Citas
                .Include(c => c.Veterinario)
                .Include(c => c.Mascota)
                .ToListAsync();
            return Ok(citas);
        }

        // Obtener una cita por ID con sus relaciones
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cita = await _context.Citas
                .Include(c => c.Veterinario)
                .Include(c => c.Mascota)
                .FirstOrDefaultAsync(c => c.Id == id);
            if (cita == null) return NotFound();
            return Ok(cita);
        }

        // Crear una nueva cita
        [HttpPost]
        public async Task<IActionResult> Create(Cita cita)
        {
            _context.Citas.Add(cita);
            await _context.SaveChangesAsync();
            return Ok(cita);
        }

        // Actualizar una cita existente
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Cita cita)
        {
            var existing = await _context.Citas.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Fecha = cita.Fecha;
            existing.Motivo = cita.Motivo;
            existing.VeterinarioId = cita.VeterinarioId;
            existing.MascotaId = cita.MascotaId;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        // Eliminar una cita por ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var cita = await _context.Citas.FindAsync(id);
            if (cita == null) return NotFound();

            _context.Citas.Remove(cita);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Buscar citas por motivo
        [HttpGet("buscar/{motivo}")]
        public async Task<IActionResult> Buscar(string motivo)
        {
            var citas = await _context.Citas
                .Include(c => c.Veterinario)
                .Include(c => c.Mascota)
                .Where(c => c.Motivo.Contains(motivo))
                .ToListAsync();
            return Ok(citas);
        }
    }
}