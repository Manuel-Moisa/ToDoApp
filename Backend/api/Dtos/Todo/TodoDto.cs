
using System;


namespace api.Dtos.Todo
{
    public class TodoDto {
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool Is_done { get; set; }
    public string? Kategorie { get; set; }
    public DateTime Kreiert { get; set; } = DateTime.Now;
    public DateTime Bearbeitet { get; set; } = DateTime.Now;
    }
}