using System;
using api.Interfaces;

namespace api.Dtos.Todo
{
    public class UpdateTextRequestDto
    {
        public string Text { get; set; } = string.Empty;
        public bool Is_done { get; set; }
        public string? Kategorie { get; set; }
    }
}