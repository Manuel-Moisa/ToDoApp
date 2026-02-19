using api.Interfaces;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;    

namespace api.Repository
{
    public class TodoRepository : ITodoRepository
    {
        private readonly ApplicationDBContext _context;
     
        public TodoRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Todos>> GetAllTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        public async Task<Todos?> GetTodoById(int id)
        {
            return await _context.Todos.FindAsync(id);
        }

        public async Task<Todos> CreateTodo(Todos todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<Todos?> UpdateTodo(Todos todo)
        {
            var existingTodo = await _context.Todos.FindAsync(todo.Id);
            if (existingTodo == null)
            {
                return null;
            }
            existingTodo.Text = todo.Text;
            existingTodo.Is_done = todo.Is_done;
            existingTodo.Kategorie = todo.Kategorie;
            existingTodo.Bearbeitet = DateTime.Now;

            await _context.SaveChangesAsync();
            return existingTodo;
        }

        public async Task<bool> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            {
                return false;
            }
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}