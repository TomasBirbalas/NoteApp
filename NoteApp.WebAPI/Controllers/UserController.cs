using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using NoteApp.Repository.Entities.NoteEntity;
using NoteApp.Repository.Models;
using NoteApp.Business.Interfaces;

namespace NoteApp.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;

        public UserController(IUserServices user, INoteServices note)
        {
            _userServices = user;
        }
        [HttpPost("AddDetails"), Authorize]
        public ActionResult DoSomething(string name, string surname, Gender gen, DateTime dob)
        {
            var result = _userServices.AddUserDetails(name, surname, gen, dob);

            return Ok(result);
        }
    }
}