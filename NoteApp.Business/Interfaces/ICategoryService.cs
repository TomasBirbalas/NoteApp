using NoteApp.Repository.Entities;

namespace NoteApp.Business.Interfaces
{
    public interface ICategoryService
    {
        void ChangeCategory(Category category, string title);
        void CreateNewCategory(string title);
        void RemoveCategory(Category category);
    }
}