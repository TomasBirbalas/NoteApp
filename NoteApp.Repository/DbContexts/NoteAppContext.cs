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

        protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlServer($"Server=localhost;Database=NoteAppDB;Trusted_Connection=True;");
    }
}
