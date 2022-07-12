using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NoteApp.Business.Interfaces;
using NoteApp.Repository.DbContexts;
using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

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
        public Note CreateNewNote(string title, string content, bool status)
        {
            var user = _userServices.GetCurrentUser();
            var newNote = new Note(title, content, status);
            user.NotesList.Add(newNote);
            _context.Add(newNote);
            _context.SaveChanges();

            return newNote;
        }
        public void AddCategoryToNote(Guid noteId, Category category)
        {
            var currentNote = GetNoteById(noteId);
            var findCategory = _context.Categories.Where(c => c.Id == category.Id).First();

            currentNote.CategoriesList.Add(category);
            _context.Notes.Update(currentNote);
            _context.SaveChanges();
        }
        public void EditNote(Guid noteId, string title, string content)
        {
            var currentNote = GetNoteById(noteId);
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
        }
        public void DeleteNote(Guid noteId)
        {
            var currentNote = GetNoteById(noteId);
            _context.Remove(currentNote);
            _context.SaveChanges();
        }

        public List<Note> GetAllNotesByUser()
        {
            var userId = _userServices.GetCurrentUserId();
            var listOfNotes = _context.Notes.Where(n => n.UserId == userId).ToList();
            return listOfNotes;
        }

        public List<Note> FilterNotesByTitle(string title)
        {
            var userId = _userServices.GetCurrentUserId();
            var filteredNotes = _context.Notes
            .Where(c => c.Title == title && c.UserId == userId)
            .ToList();

            return filteredNotes;
        }
        public List<Note> FilterNotesByCategory(string categoryTitle)
        {
            var userId = _userServices.GetCurrentUserId();
            var filteredNotes = _context.Notes
                .Include(n => n.CategoriesList)
                .Where(c => c.CategoriesList.Any(category => category.Title == categoryTitle) && c.UserId == userId)
                .ToList();

            return filteredNotes;
        }

        public Note GetNoteById(Guid noteId)
        {
            var currentNote = _context.Notes.Where(n => n.Id == noteId).First();
            return currentNote;
        }
    }
}
