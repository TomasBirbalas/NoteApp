using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoteApp.Business.Interfaces;
using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;
using NoteApp.Repository.Models.DTO;

namespace NoteApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryServices;
        public CategoryController(ICategoryService category)
        {
            _categoryServices = category;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            List<Category> result = await Task.Run(() => _categoryServices.GetAllUserCategories());
            if (result.Count == 0) return BadRequest("No categories");

            return Ok(result);
        }

        [HttpGet("notes/{id}")]
        public async Task<IActionResult> GetNotesByCategory(Guid id)
        {
            List<NoteDTO> converted;

            List<Note> result = await Task.Run(() => _categoryServices.FilterNotesByCategory(id));

            if (result.Count == 0) return BadRequest("Category is empty");

            NoteToDTO(result, out converted);
            return Ok(converted);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(string title)
        {
            var result = await Task.Run(() => _categoryServices.CreateNewCategory(title));

            if (result == null) return BadRequest("Something goes wrong");

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCategory(Guid id, string newTitle)
        {
            var result = await Task.Run(() => _categoryServices.ChangeCategory(id, newTitle));

            if (!result) return BadRequest("Something goes wrong");

            return Ok("Successfully updated!");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var result  = await Task.Run(() => _categoryServices.RemoveCategory(id));

            if (!result) return Ok("Something goes wrong!");

            return Ok("Successfully deleted!");
        }

        private void NoteToDTO(List<Note> list, out List<NoteDTO> convertedList)
        {
            convertedList = new List<NoteDTO>();

            foreach (var note in list)
            {
                List<CategoryDTO> categoryList = new List<CategoryDTO>();
                List<ImageDTO> imageList = new List<ImageDTO>();

                if (note.Images.Count > 0)
                {
                    foreach (var image in note.Images)
                    {
                        ImageDTO imageDTO = new ImageDTO() { Id = image.Id, Title = image.Title, Data = image.Data };
                        imageList.Add(imageDTO);
                    }
                }
                if (note.CategoriesList.Count > 0)
                {
                    foreach (var category in note.CategoriesList)
                    {
                        CategoryDTO categoryDTO = new CategoryDTO() { Id = category.Id, Title = category.Title };
                        categoryList.Add(categoryDTO);
                    }
                }
                convertedList.Add(new NoteDTO()
                {
                    Id = note.Id,
                    Title = note.Title,
                    Content = note.Content,
                    IsPublic = note.IsPublic,
                    Created = note.Created,
                    Images = imageList,
                    Categories = categoryList,
                });
            }
        }
    }
}
