using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;

namespace NoteApp.Business.Services
{
    public interface INoteServices
    {
        void AddCategoryToNote(Guid noteId, Category category);
        void DeleteNote(Guid noteId);
        void EditNote(Guid noteId, string title, string content);
        List<Note> FilterNotesByCategory(string categoryTitle, Guid userId);
        List<Note> FilterNotesByTitle(string title, Guid userId);
        List<Note> GetAllNotesByUser(Guid userId);
        Note GetNoteById(Guid noteId);
    }
}