using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using NoteApp.Business.Services;
using NoteApp.Repository.Entities.NoteEntity;

namespace NoteApp.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteAppController : ControllerBase
    {
        private readonly IUserServices _userServices;
        private readonly INoteServices _noteServices;

        public NoteAppController(IUserServices user, INoteServices note)
        {
            _userServices = user;
            _noteServices = note;
        }

        [HttpPost("AddNote"), Authorize]
        public IActionResult GetAllNotes(string title, string content, bool isPublic)
        {
            var newNote = _userServices.CreateNewNote(title, content, isPublic);

            return Ok($"Note created {newNote.Title}");
        }
    }
}