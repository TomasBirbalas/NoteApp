using Microsoft.EntityFrameworkCore;
using NoteApp.Business.Interfaces;
using NoteApp.Repository.DbContexts;
using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;

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

        public Category CreateNewCategory(string title)
        {
            var userId = _userServices.GetCurrentUserId();
            var category = new Category(title);
            category.UserId = userId;
            _context.Add(category);
            _context.SaveChanges();

            return category;
        }

        public Category ChangeCategory(Guid categoryId, string newTitle)
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
            return currentCategory;
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
        public List<Note> FilterNotesByCategory(Guid id)
        {
            var userId = _userServices.GetCurrentUserId();
            var filteredNotes = _context.Notes
                .Include(n => n.CategoriesList)
                .Include(n => n.Images)
                .Where(c => c.CategoriesList.Any(category => category.Id == id) && c.UserId == userId)
                .ToList();

            return filteredNotes;
        }
        public List<Category> GetAllUserCategories()
        {
            var userId = _userServices.GetCurrentUserId();
            var getAllCategories = _context.Categories.Where(category => category.UserId == userId).ToList();

            return getAllCategories;
        }
    }
}
