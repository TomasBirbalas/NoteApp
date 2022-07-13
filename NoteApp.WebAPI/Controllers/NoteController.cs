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
        public async Task<IActionResult> GetNotesByTitle([FromBody] string title)
        {
            List<Note> result = new List<Note>();

            await Task.Run(() =>
            {
                result = _noteServices.FilterNotesByTitle(title);
            });

            if (result.Count > 0)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Note not found");
            }
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> CreateNewNote(string title, string content, bool isPublic)
        {
            bool result = false;
            await Task.Run(() =>
            {
                result = _noteServices.CreateNewNote(title, content, isPublic);
            });

            if (result)
            {
                return Ok("Note is created");
            }
            else
            {
                return BadRequest("Failed");
            }
        }
        [HttpPost("{id}"), Authorize]
        public async Task<IActionResult> AddImageToNote(Guid id, string path, string title)
        {
            bool result = false;
            await Task.Run(() =>
            {
                result = _noteServices.AddImageToTheNote(id, path, title);
            });
            if (!result)
            {
                return BadRequest("Image cant be added");
            }
            return Ok("Success: image added");
        }

        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> UpdateNote(Guid id, string title, string content)
        {
            bool result = false;
            await Task.Run(() =>
            {
                result = _noteServices.EditNote(id, title, content);
            });

            if (result)
            {
                return Ok("Successfully updated");
            }
            else
            {
                return BadRequest("Note is not your");
            }
        }
        [HttpPut("{id}/category"), Authorize]
        public async Task<IActionResult> AddCategory(Guid id, [FromBody] string categoryTitle)
        {
            bool result = false;
            await Task.Run(() =>
            {
                result = _noteServices.AddCategoryToNote(id, categoryTitle);
            });

            if (result)
            {
                return Ok("Category successfully added");
            }
            else
            {
                return BadRequest("Category Not found");
            }
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            bool result = false;
            await Task.Run(() =>
            {
                result = _noteServices.DeleteNote(id);
            });

            if (result)
            {
                return Ok("Note successfully deleted");
            }
            else
            {
                return BadRequest("You cant delete this note");
            }
        }
    }
}
