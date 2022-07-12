using NoteApp.Repository.Entities;
using NoteApp.Repository.Models;

namespace NoteApp.Business.Interfaces
{
    public interface IUserServices
    {
        string AddUserDetails(string name, string surname, Gender gender, DateTime dob);
        User GetCurrentUser();
        Guid GetCurrentUserId();
    }
}