using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;

namespace NoteApp.Business.Interfaces
{
    public interface ICategoryService
    {
        bool ChangeCategory(Guid categoryId, string newTitle);
        bool CreateNewCategory(string title);
        bool RemoveCategory(Guid categoryId);
        List<Note> FilterNotesByCategory(string categoryTitle);
    }
}