using NoteApp.Repository.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoteApp.Repository.Entities
{
    public class UserDetails
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }

        [Required]
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public User User { get; set; }

        public UserDetails(string name, string surname, Gender gender, DateTime dateOfBirth)
        {
            Id = Guid.NewGuid();
            Name = name;
            Surname = surname;
            Gender = gender;
            DateOfBirth = dateOfBirth;

            Created = DateTime.Now;
        }
    }
}
