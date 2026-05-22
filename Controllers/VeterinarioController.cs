using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VetApp.Data;
using VetApp.Models;

namespace VetApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VeterinarioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VeterinarioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var veterinarios = await _context.Veterinarios.ToListAsync();
            return Ok(veterinarios);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var veterinario = await _context.Veterinarios.FindAsync(id);
            if (veterinario == null) return NotFound();
            return Ok(veterinario);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Veterinario veterinario)
        {
            _context.Veterinarios.Add(veterinario);
            await _context.SaveChangesAsync();
            return Ok(veterinario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Veterinario veterinario)
        {
            var existing = await _context.Veterinarios.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Nombre = veterinario.Nombre;
            existing.Especialidad = veterinario.Especialidad;
            existing.Telefono = veterinario.Telefono;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var veterinario = await _context.Veterinarios.FindAsync(id);
            if (veterinario == null) return NotFound();

            _context.Veterinarios.Remove(veterinario);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}