using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteApp.Repository.Entities.NoteEntity
{
    public class Note
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public bool IsPublic { get; set; } = true;
        public DateTime Created { get; set; }
        public List<Image> Images { get; set; }

        public Note(string title, string content, bool isPublic)
        {
            Id = Guid.NewGuid();
            Title = title;
            Content = content;
            IsPublic = isPublic;
            Created = DateTime.Now;

            Images = new List<Image>();
        }
    }
}
