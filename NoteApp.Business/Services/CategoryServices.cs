using NoteApp.Repository.DbContexts;
using NoteApp.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteApp.Business.Services
{
    public class CategoryServices : ICategoryServices
    {
        private readonly NoteAppContext _context;

        public CategoryServices(NoteAppContext context)
        {
            _context = context;
        }

        public void CreateNewCategory(string title)
        {
            var category = new Category(title);
            _context.Add(category);
            _context.SaveChanges();
        }

        public void ChangeCategory(Category category, string title)
        {
            var currentCategory = _context.Categories.Where(c => c.Id == category.Id).FirstOrDefault();
            if (currentCategory != null)
            {
                category.Title = title;
                _context.SaveChanges();
            }
        }
        public void RemoveCategory(Category category)
        {
            var currentCategory = _context.Categories
                .Where(c => c.Id == category.Id)
                .FirstOrDefault();
            if (currentCategory != null)
            {
                _context.Categories.Remove(currentCategory);
                _context.SaveChanges();
            }
        }
    }
}
