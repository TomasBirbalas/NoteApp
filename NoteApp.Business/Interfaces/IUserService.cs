using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;
using NoteApp.Repository.Models;

namespace NoteApp.Business.Interfaces
{
    public interface IUserService
    {
        string AddUserDetails(string name, string surname, Gender gender, DateTime dob);
        UserDetails GetUser();
        List<Note> GetAllNotesByUser();
        User GetCurrentUser();
        Guid GetCurrentUserId();
    }
}