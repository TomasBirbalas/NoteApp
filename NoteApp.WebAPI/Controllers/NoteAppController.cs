using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteApp.Business.Services;
using NoteApp.Repository.DbContexts;

namespace NoteApp.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteAppController : ControllerBase
    {
        private readonly NoteAppContext _context;

        private readonly UserServices _userServices;
        private readonly CategoryServices _categoryServices;

        public NoteAppController(NoteAppContext context, UserServices user, CategoryServices category)
        {
            _context = context;

            _userServices = user;
            _categoryServices = category;
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