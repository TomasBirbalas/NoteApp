﻿using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;

namespace NoteApp.Business.Interfaces
{
    public interface ICategoryService
    {
        Category ChangeCategory(Guid categoryId, string newTitle);
        Category CreateNewCategory(string title);
        bool RemoveCategory(Guid categoryId);
        List<Note> FilterNotesByCategory(Guid id);
        List<Category> GetAllUserCategories();
    }
}