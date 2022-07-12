using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;
using NoteApp.Repository.Models;

namespace NoteApp.Business.Services
{
    public interface IUserServices
    {
        void AddUserDetails(string name, string surname, Gender gender, DateTime dob);
        Note CreateNewNote(string title, string content, bool status);
        User GetCurrentUser();
    }
}