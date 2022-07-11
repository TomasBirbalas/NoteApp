using NoteApp.Repository.Entities;
using NoteApp.Repository.Models;

namespace NoteApp.Business
{
    public interface IUserServices
    {
        void AddUserDetails(string name, string surname, Gender gender, DateTime dob);
        void CreateNewCategory(string title);
        void CreateNewNote(string title, string content, bool status);
        User GetCurrentUser();
    }
}