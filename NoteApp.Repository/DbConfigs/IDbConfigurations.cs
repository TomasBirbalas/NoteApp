using Microsoft.EntityFrameworkCore;

namespace NoteApp.Repository.DbConfigs
{
    public interface IDbConfigurations
    {
        string ConnectionString { get; set; }
        DbContextOptions Options { get; set; }
    }
}