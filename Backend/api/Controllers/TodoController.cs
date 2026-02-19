using Microsoft.AspNetCore.Mvc; 
using api.Data;                
using api.Models;               
using Microsoft.EntityFrameworkCore;
using api.Dtos.Todo;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class TodoController : ControllerBase
    {
    private readonly ApplicationDBContext _context;
      public TodoController(ApplicationDBContext context)
      {
        _context = context;
      }

    [HttpGet]
          public async Task<ActionResult<IEnumerable<TodoDto>>> GetTodos()
          { 
                return await _context.Todos.Select(t => t.ToTodoDto()).ToListAsync();
          }
    [HttpGet("{id}")]
        public async Task<ActionResult<Todos>> GetTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            {
            return NotFound();
            }
            return todo;
        }
    [HttpPost]
        public async Task<ActionResult<Todos>> CreateTodo(CreateTextRequestDto createTodoDto)
        {
            var todo = createTodoDto.ToTodo();
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }
    [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, UpdateTextRequestDto TodoDto)
        {
            
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            todo.Text = TodoDto.Text;
            todo.Is_done = TodoDto.Is_done;
            todo.Kategorie = TodoDto.Kategorie;
            todo.Bearbeitet = DateTime.Now;
            await _context.SaveChangesAsync();
            return NoContent();
        } 
    [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
  