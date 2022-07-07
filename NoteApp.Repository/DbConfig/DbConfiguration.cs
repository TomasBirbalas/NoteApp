using Microsoft.EntityFrameworkCore;

namespace NoteApp.Repository.DbConfig
{
    public class DbConfiguration : IDbConfiguration
    {
        public string ConnectionString { get; set; }
        public DbContextOptions Options { get; set; }
        public DbConfiguration()
        {
            ConnectionString = config.GetConnectionString("DatabaseConnect");
            Options = new DbContextOptionsBuilder().UseSqlServer(ConnectionString).Options;
        }

    }
}
