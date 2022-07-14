using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoteApp.Business.Interfaces;
using NoteApp.Repository.Entities.NoteEntity;

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

        [HttpGet("notes"), Authorize]
        public async Task<IActionResult> GetNotesByCategory([FromBody] string title)
        {
            List<Note> result = await Task.Run(() => _categoryServices.FilterNotesByCategory(title));

            if (result.Count == 0) return BadRequest("Category is empty");

            return Ok(result);
        }

        [HttpPost(), Authorize]
        public async Task<IActionResult> CreateCategory(string title)
        {
            var result = await Task.Run(() => _categoryServices.CreateNewCategory(title));

            if (!result) return BadRequest("Something goes wrong");

            return Ok($"Successfully created!");
        }

        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> EditCategory(Guid id, [FromBody] string newTitle)
        {
            var result = await Task.Run(() => _categoryServices.ChangeCategory(id, newTitle));

            if (!result) return BadRequest("Something goes wrong");

            return Ok("Successfully updated!");
        }
        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var result  = await Task.Run(() => _categoryServices.RemoveCategory(id));

            if (!result) return Ok("Something goes wrong!");

            return Ok("Successfully deleted!");
        }
    }
}
