using api.Models;


namespace api.Interfaces
{
    public interface ITodoRepository
    {
        Task<List<Todos>> GetAllTodos();
        Task<Todos?> GetTodoById(int id);
        Task<Todos> CreateTodo(Todos todo);
        Task<Todos?> UpdateTodo(Todos todo);
        Task<bool> DeleteTodo(int id);
    }
}
