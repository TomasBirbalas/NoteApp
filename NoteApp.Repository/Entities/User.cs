using NoteApp.Repository.Entities.NoteEntity;
using System.ComponentModel.DataAnnotations;

namespace NoteApp.Repository.Entities
{
    public class User
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public List<Note> NotesList { get; set; }

        public User(string email, string password)
        {
            Id = Guid.NewGuid();
            Email = email;
            Password = password;

            NotesList = new List<Note>();
        }
    }
}