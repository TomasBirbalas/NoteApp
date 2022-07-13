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
            List<Note> result = new List<Note>();

            await Task.Run(() =>
            {
                result = _categoryServices.FilterNotesByCategory(title);
            });

            if (result.Count > 0)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Category is empty");
            }
        }

        [HttpPost(), Authorize]
        public IActionResult DisplayAllCategories(string title)
        {
            _categoryServices.CreateNewCategory(title);
            return Ok($"Note created");
        }

        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> EditCategory(Guid id, [FromBody] string newTitle)
        {
            bool result = false;

            await Task.Run(() =>
            {
                result = _categoryServices.ChangeCategory(id, newTitle);
            });
            if (!result)
            {
                return Ok("Something goes wrong");
            }
            return Ok("Successfully updated category");
        }
        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            bool result = false;

            await Task.Run(() =>
            {
                result = _categoryServices.RemoveCategory(id);
            });
            if (!result)
            {
                return Ok("Something goes wrong");
            }
            return Ok("Successfully deleted");
        }
    }
}
