﻿using Microsoft.AspNetCore.Http;
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
        public bool CreateNewNote(string title, string content, bool status)
        {
            var user = _userServices.GetCurrentUser();
            var newNote = new Note(title, content, status);
            user.NotesList.Add(newNote);
            _context.Add(newNote);
            _context.SaveChanges();

            return true;
        }
        public bool AddCategoryToNote(Guid noteId, string categoryTitle)
        {
            var currentNote = GetNoteById(noteId);
            var findCategory = _context.Categories.Where(c => c.Title == categoryTitle).First();
            currentNote.CategoriesList.Add(findCategory);
            _context.Notes.Update(currentNote);
            _context.SaveChanges();

            return true;
        }
        public bool EditNote(Guid noteId, string title, string content)
        {
            var userId = _userServices.GetCurrentUserId();
            var currentNote = GetNoteById(noteId);

            if (currentNote.UserId != userId)
            {
                return false;
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

            return true;
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
            var currentNote = _context.Notes.Where(n => n.Id == noteId).First();
            return currentNote;
        }
    }
}
