using System;

namespace api.Dtos.Todo
{
    public class UpdateTextRequestDto
    {
        public string Text { get; set; } = string.Empty;
        public string? Kategorie { get; set; }
    }
}