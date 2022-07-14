using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoteApp.Business.Interfaces;
using NoteApp.Repository.Entities.NoteEntity;

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
        [HttpGet, Authorize]
        public async Task<IActionResult> GetNotesByTitle(string title)
        {
            var result = await Task.Run(() => _noteServices.FilterNotesByTitle(title));

            if (result.Count == 0) return BadRequest("Note not found");

            return Ok(result);
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> CreateNewNote(string title, string content, bool isPublic)
        {
            var result = await Task.Run(() => _noteServices.CreateNewNote(title, content, isPublic));

            if (!result) return BadRequest("Failed");

            return Ok("Note is created");
        }
        [HttpPost("{id}"), Authorize]
        public async Task<IActionResult> AddImageToNote(Guid id, string path, string title)
        {
            var result = await Task.Run(() => _noteServices.AddImageToTheNote(id, path, title));

            if (!result) return BadRequest("Image cant be added");

            return Ok("Success: image added");
        }

        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> UpdateNote(Guid id, string title, string content)
        {
            var result = await Task.Run(() => _noteServices.EditNote(id, title, content));

            if (result!) return BadRequest("Note is not your");

            return Ok("Successfully updated");
        }

        [HttpPut("{id}/category"), Authorize]
        public async Task<IActionResult> AddCategory(Guid id, [FromBody] string categoryTitle)
        {
            bool result = await Task.Run(() => _noteServices.AddCategoryToNote(id, categoryTitle));

            if (!result) return BadRequest("Category Not found");

            return Ok("Category successfully added");
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            var result = await Task.Run(() => _noteServices.DeleteNote(id));

            if (!result) return BadRequest("You cant delete this note");

            return Ok("Note successfully deleted");
        }
    }
}
