using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteApp.Repository.Models.DTO
{
    public class NoteDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool IsPublic { get; set; }
        public DateTime Created { get; set; }
        public List<ImageDTO> Images { get; set; }
        public List<CategoryDTO> Categories { get; set; }
    }
}
