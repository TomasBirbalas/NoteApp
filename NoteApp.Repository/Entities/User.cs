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

            if (new EmailAddressAttribute().IsValid(email))
            {
                Email = email;
            }
            if (PasswordValidation(password))
            {
                Password = password;
            }

            NotesList = new List<Note>();
        }

        private bool PasswordValidation(string password)
        {
            char[] specialChArray = @"%!@#$%^&*()?/>.<,:;'\|}]{[_~`+=-".ToCharArray();

            if (password.Length < 8)
            {
                return false;
            }
            if(!password.Any(char.IsUpper))
            {
                return false;
            }
            if (!password.Any(char.IsLower))
            {
                return false;
            }
            if (password.Contains(" "))
            {
                return false;
            }

            foreach (char ch in specialChArray)
            {
                if (password.Contains(ch))
                    return true;
            }
            return true;
        }
    }
}