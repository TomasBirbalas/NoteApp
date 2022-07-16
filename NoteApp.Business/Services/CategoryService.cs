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

namespace NoteApp.Business.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly NoteAppContext _context;
        private readonly IUserService _userServices;

        public CategoryService(NoteAppContext context, IUserService user)
        {
            _context = context;
            _userServices = user;
        }

        public bool CreateNewCategory(string title)
        {
            var userId = _userServices.GetCurrentUserId();
            var category = new Category(title);
            category.UserId = userId;
            _context.Add(category);
            _context.SaveChanges();

            return true;
        }

        public bool ChangeCategory(Guid categoryId, string newTitle)
        {
            var userId = _userServices.GetCurrentUserId();
            var currentCategory = _context.Categories
                .Where(c => c.Id == categoryId && c.UserId == userId)
                .FirstOrDefault();

            if (currentCategory != null)
            {
                currentCategory.Title = newTitle;
                _context.SaveChanges();
            }
            return true;
        }
        public bool RemoveCategory(Guid categoryId)
        {
            var userId = _userServices.GetCurrentUserId();
            var currentCategory = _context.Categories
                .Where(c => c.Id == categoryId && c.UserId == userId)
                .FirstOrDefault();
            if (currentCategory != null)
            {
                _context.Categories.Remove(currentCategory);
                _context.SaveChanges();
            }
            return true;
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
        public List<Category> GetAllCategoriesFromDB()
        {
            var getAllCategories = _context.Categories.ToList();

            return getAllCategories;
        }
    }
}
