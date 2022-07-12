using NoteApp.Repository.Entities;

namespace NoteApp.Business.Interfaces
{
    public interface ICategoryServices
    {
        void ChangeCategory(Category category, string title);
        void CreateNewCategory(string title);
        void RemoveCategory(Category category);
    }
}