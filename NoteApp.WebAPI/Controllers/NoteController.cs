using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoteApp.Business.Interfaces;
using NoteApp.Repository.Entities.NoteEntity;
using NoteApp.Repository.Models.DTO;

namespace NoteApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteService _noteServices;
        public NoteController(INoteService note)
        {
            _noteServices = note;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetNotesByTitle(string title)
        {
            var result = await Task.Run(() => _noteServices.FilterNotesByTitle(title));

            if (result.Count == 0) return BadRequest("Note not found");

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewNote(string title, string content, bool isPublic)
        {
            var result = await Task.Run(() => _noteServices.CreateNewNote(title, content, isPublic));

            if (result == null) return BadRequest("Failed");

            return Ok(result);
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> AddImageToNote(Guid id, [FromBody]string image, string title)
        {
            string convert = image.Replace("data:image/png;base64,", String.Empty);

            byte[] image64 = Convert.FromBase64String(convert);

            var result = await Task.Run(() => _noteServices.AddImageToTheNote(id, image64, title));

            if (!result) return BadRequest("Image cant be added");

            return Ok("Success: image added");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(Guid id, string title, string content)
        {
            var result = await Task.Run(() => _noteServices.EditNote(id, title, content));

            if (result == null) return BadRequest("Note is not your");

            NoteDTO converted = NoteToDTO(result);

            return Ok(converted);
        }

        [HttpPut("{id}/category")]
        public async Task<IActionResult> AddCategory(Guid id, string categoryTitle)
        {
            bool result = await Task.Run(() => _noteServices.AddCategoryToNote(id, categoryTitle));

            if (!result) return BadRequest("Category Not found");

            return Ok("Category successfully added");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            var result = await Task.Run(() => _noteServices.DeleteNote(id));

            if (!result) return BadRequest("You cant delete this note");

            return Ok("Note successfully deleted");
        }

        private NoteDTO NoteToDTO(Note note)
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
                NoteDTO converted = new NoteDTO()
                {
                    Id = note.Id,
                    Title = note.Title,
                    Content = note.Content,
                    IsPublic = note.IsPublic,
                    Created = note.Created,
                    Images = imageList,
                    Categories = categoryList,
                };
            return converted;
        }
    }
}
