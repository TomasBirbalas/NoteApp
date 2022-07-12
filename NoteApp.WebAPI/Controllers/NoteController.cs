using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoteApp.Business.Interfaces;

namespace NoteApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteServices _noteServices;
        public NoteController(INoteServices note)
        {
            _noteServices = note;
        }

        [HttpPost("AddNote"), Authorize]
        public IActionResult GetAllNotes(string title, string content, bool isPublic)
        {
            var newNote = _noteServices.CreateNewNote(title, content, isPublic);

            return Ok($"Note created {newNote.Title}");
        }
    }
}
