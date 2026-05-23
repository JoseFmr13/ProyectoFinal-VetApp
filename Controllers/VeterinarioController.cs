using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VetApp.Data;
using VetApp.Models;

namespace VetApp.Controllers
{
    // Controlador para gestionar el catálogo de veterinarios
    [ApiController]
    [Route("api/[controller]")]
    public class VeterinarioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VeterinarioController(AppDbContext context)
        {
            _context = context;
        }

        // Obtener todos los veterinarios
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var veterinarios = await _context.Veterinarios.ToListAsync();
            return Ok(veterinarios);
        }

        // Obtener un veterinario por ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var veterinario = await _context.Veterinarios.FindAsync(id);
            if (veterinario == null) return NotFound();
            return Ok(veterinario);
        }

        // Crear un nuevo veterinario
        [HttpPost]
        public async Task<IActionResult> Create(Veterinario veterinario)
        {
            _context.Veterinarios.Add(veterinario);
            await _context.SaveChangesAsync();
            return Ok(veterinario);
        }

        // Actualizar un veterinario existente
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

        // Eliminar un veterinario por ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var veterinario = await _context.Veterinarios.FindAsync(id);
            if (veterinario == null) return NotFound();

            _context.Veterinarios.Remove(veterinario);
            await _context.SaveChangesAsync();
            return Ok();
        }


        // Buscar veterinarios por nombre
        [HttpGet("buscar/{nombre}")]
        public async Task<IActionResult> Buscar(string nombre)
        {
            var veterinarios = await _context.Veterinarios
                .Where(v => v.Nombre.Contains(nombre))
                .ToListAsync();
            return Ok(veterinarios);
        }

        // Obtener el total de veterinarios registrados
        [HttpGet("total")]
        public async Task<IActionResult> Total()
        {
            var total = await _context.Veterinarios.CountAsync();
            return Ok(new { total });
        }
    }
}