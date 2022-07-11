using NoteApp.Repository.Entities;
using NoteApp.Repository.Models;

namespace NoteApp.Business
{
    public interface IUserServices
    {
        void AddUserDetails(string name, string surname, Gender gender, DateTime dob);
        void CreateNewNote(string title, string content, bool status);
        User GetCurrentUser();
    }
}