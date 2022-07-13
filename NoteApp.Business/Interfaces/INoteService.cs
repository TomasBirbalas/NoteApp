using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;

namespace NoteApp.Business.Interfaces
{
    public interface INoteService
    {
        bool AddCategoryToNote(Guid noteId, string categoryTitle);
        bool CreateNewNote(string title, string content, bool status);
        bool DeleteNote(Guid noteId);
        bool EditNote(Guid noteId, string title, string content);
        List<Note> FilterNotesByTitle(string title);
        Note GetNoteById(Guid noteId);
        bool AddImageToTheNote(Guid noteId, string imagePath, string title);
    }
}