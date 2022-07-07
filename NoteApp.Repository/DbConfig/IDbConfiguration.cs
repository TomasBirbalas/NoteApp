using Microsoft.EntityFrameworkCore;

namespace NoteApp.Repository.DbConfig
{
    public interface IDbConfiguration
    {
        string ConnectionString { get; set; }
        DbContextOptions Options { get; set; }
    }
}