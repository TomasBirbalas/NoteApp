using Microsoft.EntityFrameworkCore;
using NoteApp.Business.Interfaces;
using NoteApp.Repository.DbContexts;
using NoteApp.Repository.Entities.NoteEntity;

namespace NoteApp.Business.Services
{
    public class NoteService : INoteService
    {
        private readonly NoteAppContext _context;
        private readonly IUserService _userServices;

        public NoteService(NoteAppContext context, IUserService user)
        {
            _context = context;
            _userServices = user;
        }
        public Guid CreateNewNote(string title, string content, bool status)
        {
            var user = _userServices.GetCurrentUser();
            var newNote = new Note(title, content, status);
            user.NotesList.Add(newNote);
            _context.Add(newNote);
            _context.SaveChanges();

            return newNote.Id;
        }
        public bool AddCategoryToNote(Guid noteId, string categoryTitle)
        {
            var currentNote = GetNoteById(noteId);
            var findCategory = _context.Categories.Where(c => c.Title == categoryTitle).First();
            currentNote.CategoriesList.Add(findCategory);
            findCategory.NotesList.Add(currentNote);
            _context.Update(findCategory);
            _context.SaveChanges();

            return true;
        }
        public Note EditNote(Guid noteId, string title, string content)
        {
            var userId = _userServices.GetCurrentUserId();
            var currentNote = GetNoteById(noteId);

            if (currentNote.UserId != userId)
            {
                return null;
            }

            if (title != null)
            {
                currentNote.Title = title;
            }
            if (content != null)
            {
                currentNote.Content = content;
            }
            _context.Notes.Update(currentNote);
            _context.SaveChanges();

            return currentNote;
        }
        public bool DeleteNote(Guid noteId)
        {
            var userId = _userServices.GetCurrentUserId();
            var currentNote = GetNoteById(noteId);

            if (currentNote.UserId != userId)
            {
                return false;
            }
            _context.Remove(currentNote);
            _context.SaveChanges();

            return true;
        }

        public List<Note> FilterNotesByTitle(string title)
        {
            var userId = _userServices.GetCurrentUserId();
            var filteredNotes = _context.Notes
            .Where(c => c.Title.ToUpper().StartsWith(title.ToUpper()) && c.UserId == userId)
            .ToList();

            return filteredNotes;
        }

        public Note GetNoteById(Guid noteId)
        {
            var currentNote = _context.Notes.Include(n => n.Images).Include(n => n.CategoriesList).Where(n => n.Id == noteId).First();
            return currentNote;
        }
        public void UploadImage()
        {

        }
        public bool AddImageToTheNote(Guid noteId, byte[] data, string title)
        {
            var userId = _userServices.GetCurrentUserId();
            var note = _context.Notes?
                .Where(n => n.Id == noteId && n.UserId == userId)
                .FirstOrDefault();

            if (note == null)
            {
                return false;
            }
            var image = new Image(title, data);
            note.Images.Add(image);

            _context.Add(image);
            _context.SaveChanges();
            return true;
        }
        private byte[] ConvertImageToBinary(string imagePath)
        {
            FileStream fileStream = new FileStream(imagePath, FileMode.Open, FileAccess.Read);
            byte[] buffer = new byte[fileStream.Length];
            fileStream.Read(buffer, 0, (int)fileStream.Length);
            fileStream.Close();
            return buffer;
        }
    }
}
