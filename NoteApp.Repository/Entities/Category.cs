using NoteApp.Repository.Entities.NoteEntity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteApp.Repository.Entities
{
    public class Category
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        public DateTime CreatedAt { get; set; }

        [Required]
        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public List<Note> NotesList { get; set; }

        public Category(string title)
        {
            Id = Guid.NewGuid();
            Title = title;
            CreatedAt = DateTime.Now;

            NotesList = new List<Note>();
        }
    }
}
