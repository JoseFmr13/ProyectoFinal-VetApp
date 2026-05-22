using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VetApp.Data;
using VetApp.Models;

namespace VetApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MascotaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MascotaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var mascotas = await _context.Mascotas.ToListAsync();
            return Ok(mascotas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var mascota = await _context.Mascotas.FindAsync(id);
            if (mascota == null) return NotFound();
            return Ok(mascota);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Mascota mascota)
        {
            _context.Mascotas.Add(mascota);
            await _context.SaveChangesAsync();
            return Ok(mascota);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Mascota mascota)
        {
            var existing = await _context.Mascotas.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Nombre = mascota.Nombre;
            existing.Especie = mascota.Especie;
            existing.Raza = mascota.Raza;
            existing.NombreDueno = mascota.NombreDueno;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var mascota = await _context.Mascotas.FindAsync(id);
            if (mascota == null) return NotFound();

            _context.Mascotas.Remove(mascota);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}