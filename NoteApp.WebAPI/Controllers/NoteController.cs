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

        [HttpPost, Authorize]
        public IActionResult GetAllNotes(string title, string content, bool isPublic)
        {
            var newNote = _noteServices.CreateNewNote(title, content, isPublic);

            return Ok($"Note created {newNote.Title}");
        }

        [HttpPut("{id}"), Authorize]
        public IActionResult UpdateNote(Guid id, string title, string content)
        {
            var result = _noteServices.EditNote(id, title, content);

            if (result)
            {
                return Ok("Successfully updated");
            }
            else
            {
                return BadRequest("Note is not your");
            }
        }

        [HttpDelete("{id}"), Authorize]
        public IActionResult DeleteNote(Guid id)
        {
            var result = _noteServices.DeleteNote(id);

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
