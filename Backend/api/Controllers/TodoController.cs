using Microsoft.AspNetCore.Mvc; 
using api.Data;                
using api.Models;               
using Microsoft.EntityFrameworkCore;
using api.Dtos.Todo;
using api.Mappers;
using api.Repository;
using api.Interfaces;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class TodoController : ControllerBase
    {
    private readonly ITodoRepository _repository;
   
      public TodoController(ITodoRepository todoRepo)
      {
        _repository = todoRepo;
      }

    [HttpGet]
          public async Task<ActionResult<IEnumerable<TodoDto>>> GetTodos()
          {     
            var todos = await _repository.GetAllTodos();
            var todoDtos = todos.Select(t => t.ToTodoDto()).ToList();
            return Ok(todoDtos);
          }
    [HttpGet("{id}")]
        public async Task<ActionResult<TodoDto>> GetTodoById(int id)
        {
            var todo = await _repository.GetTodoById(id);
            if (todo == null)
            {
            return NotFound();
            }
            return Ok(todo.ToTodoDto());
        }
    [HttpPost]
        public async Task<ActionResult<Todos>> CreateTodo(CreateTextRequestDto createTodoDto)
        {
            var todo = createTodoDto.ToTodo();
            await _repository.CreateTodo(todo);
            return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
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
            await _repository.UpdateTodo(todo);
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
            await _repository.DeleteTodo(id);
            return NoContent();
        }
    }
}
  