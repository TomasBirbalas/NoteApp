using Microsoft.EntityFrameworkCore;
using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;

namespace NoteApp.Repository.DbContexts
{
    public class NoteAppContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserDetails> UserDetails { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<RefreshToken>? RefreshTokens { get; set; }

        public NoteAppContext()
        {

        }

        public NoteAppContext(DbContextOptions<NoteAppContext> options) : base(options)
        {

        }
    }
}
