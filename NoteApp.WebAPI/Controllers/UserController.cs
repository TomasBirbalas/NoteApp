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
        private readonly IUserService _userServices;

        public UserController(IUserService user, INoteService note)
        {
            _userServices = user;
        }
        [HttpPost("AddDetails"), Authorize]
        public async Task<ActionResult> AddDetailsToUser(string name, string surname, Gender gen, DateTime dob)
        {
            var result = "";
            await Task.Run(() =>
            {
                result = _userServices.AddUserDetails(name, surname, gen, dob);
            });
            return Ok(result);
        }
    }
}