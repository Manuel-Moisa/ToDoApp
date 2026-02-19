

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

    }
}
