using Microsoft.EntityFrameworkCore;
using NoteApp.Repository.DbConfig;
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

        public NoteAppContext(IDbConfiguration options) : base(options.Options)
        {

        }
    }
}
