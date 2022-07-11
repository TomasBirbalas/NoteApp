using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteApp.Repository.DbContexts;

namespace NoteApp.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteAppController : ControllerBase
    {
        private readonly NoteAppContext _context;

        public NoteAppController(NoteAppContext context)
        {
            _context = context;
        }

        [HttpGet("notes"), Authorize]
        public IActionResult GetAllNotes()
        {
            var notesList = _context.Notes.ToList();

            if(notesList.Count == 0)
            {
                return BadRequest("No notes");
            }

            return Ok(notesList);
        }

    }
}