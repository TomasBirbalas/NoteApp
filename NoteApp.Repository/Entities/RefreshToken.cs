using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteApp.Repository.Entities
{
    public class RefreshToken
    {
        public Guid Id { get; set; }
        [Required]
        public string Token { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime Expires { get; set; }
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
