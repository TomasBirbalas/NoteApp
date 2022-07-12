using NoteApp.Repository.Entities;

namespace NoteApp.Business.Services
{
    public interface ICategoryServices
    {
        void ChangeCategory(Category category, string title);
        void CreateNewCategory(string title);
        void RemoveCategory(Category category);
    }
}