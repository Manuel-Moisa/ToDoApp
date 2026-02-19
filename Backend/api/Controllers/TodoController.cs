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
    private readonly ItodoRepository _repository;
   
      public TodoController(ItodoRepository todoRepo)
      {
        _repository = todoRepo;
      }

    [HttpGet]
          public async Task<ActionResult<IEnumerable<TodoDto>>> GetTodos()
          { 
                return await _repository.GetAllTodos().Select(t => t.ToTodoDto()).ToListAsync();
          }
    [HttpGet("{id}")]
        public async Task<ActionResult<Todos>> GetTodo(int id)
        {
            var todo = await _repository.GetTodoById(id);
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
            _repository.CreateTodo(todo);
            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }
    [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, UpdateTextRequestDto TodoDto)
        {
            
            var todo = await _repository.GetTodoById(id);
            if (todo == null)
            {
                return NotFound();
            }
            todo.Text = TodoDto.Text;
            todo.Is_done = TodoDto.Is_done;
            todo.Kategorie = TodoDto.Kategorie;
            todo.Bearbeitet = DateTime.Now;
            _repository.UpdateTodo(todo);
            return NoContent();
        } 
    [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _repository.GetTodoById(id);
            if (todo == null)
            {
                return NotFound();
            }
            _repository.DeleteTodo(id);
            return NoContent();
        }
    }
}
  