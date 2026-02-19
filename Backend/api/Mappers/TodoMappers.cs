using api.Dtos.Todo;
using api.Models;


namespace api.Mappers;

public static class TodoMappers
{
    public static TodoDto ToTodoDto(this Todos todo)
    {
        return new TodoDto
        {
            Id = todo.Id,
            Text = todo.Text,
            Is_done = todo.Is_done,
            Kategorie = todo.Kategorie,
        };
    }
    public static Todos ToTodo(this CreateTextRequestDto createTodoDto)
    {
        return new Todos
        {
            Text = createTodoDto.Text,
            Is_done = false,
            Kategorie = createTodoDto.Kategorie
        };
    }
}

