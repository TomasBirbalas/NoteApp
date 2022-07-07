using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteApp.Repository.Entities.NoteEntity
{
    public class Image
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        public string Alt { get; set; }
        public DateTime PostedAt { get; set; }

        [Required]
        [ForeignKey("Note")]
        public Guid NoteId { get; set; }
        public Note Note { get; set; }

        public Image(string title, string alt)
        {
            Id = Guid.NewGuid();
            Title = title;

            Alt = alt;
            PostedAt = DateTime.Now;
        }
    }
}
