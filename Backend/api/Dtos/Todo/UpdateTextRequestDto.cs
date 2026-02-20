using System;
using api.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Todo
{
    public class UpdateTextRequestDto
    {
        [Required(ErrorMessage = "Text is required.")]
        [MinLength(1, ErrorMessage = "Text cannot be empty.")]
        [MaxLength(100, ErrorMessage = "Text cannot exceed 100 characters.")]
        public string Text { get; set; } = string.Empty;
        [Required(ErrorMessage = "Is_done is required.")]
        public bool Is_done { get; set; }
        [MaxLength(40, ErrorMessage = "Kategorie cannot exceed 40 characters.")]
        public string? Kategorie { get; set; }
    }
}