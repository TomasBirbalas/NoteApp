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
        public string Email { get; set; } = string.Empty;
        
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public List<Note> NotesList { get; set; }

        public List<RefreshToken> RefreshTokens { get; set; }

        public User(string email, byte[] passwordHash, byte[] passwordSalt)
        {
            Id = Guid.NewGuid();

            if (new EmailAddressAttribute().IsValid(email))
            {
                Email = email;
            }
            PasswordHash = passwordHash;
            PasswordSalt = passwordSalt;

            NotesList = new List<Note>();
            RefreshTokens = new List<RefreshToken>();
        }
    }
}