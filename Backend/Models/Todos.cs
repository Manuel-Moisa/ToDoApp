




namespace Backend.Models
{
    public class Todos
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool Is_done { get; set; } = false;
        public string kategorie { get; set; }
        public DateTime Kreiert { get; set; }
        public DateTime Bearbeitet { get; set; }

        
    }
}

   