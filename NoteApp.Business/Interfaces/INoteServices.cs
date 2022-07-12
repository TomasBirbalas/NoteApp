using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;

namespace NoteApp.Business.Interfaces
{
    public interface INoteServices
    {
        void AddCategoryToNote(Guid noteId, Category category);
        Note CreateNewNote(string title, string content, bool status);
        void DeleteNote(Guid noteId);
        void EditNote(Guid noteId, string title, string content);
        List<Note> FilterNotesByCategory(string categoryTitle);
        List<Note> FilterNotesByTitle(string title);
        List<Note> GetAllNotesByUser();
        Note GetNoteById(Guid noteId);
    }
}