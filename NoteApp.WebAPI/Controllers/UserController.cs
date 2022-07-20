using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteApp.Business.Interfaces;
using NoteApp.Repository.Entities.NoteEntity;
using NoteApp.Repository.Models;
using NoteApp.Repository.Models.DTO;

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
        [Authorize]
        [HttpPost("AddDetails")]
        public async Task<ActionResult> AddDetailsToUser(string name, string surname, Gender gen, DateTime dob)
        {
            var result = await Task.Run(() => _userServices.AddUserDetails(name, surname, gen, dob));

            if(result == "") BadRequest("Filled incorrectly");

            return Ok(result);
        }
        [HttpGet]
        public async Task<ActionResult> GetUserDetails()
        {
            var result = await Task.Run(() => _userServices.GetUser());

            if (result == null) return BadRequest("UserDetails not found");

            return Ok(result);
        }
        [HttpGet("Notes")]
        public async Task<IActionResult> GetAllNotesByUser()
        {
            List<NoteDTO> converted;

            var result = await Task.Run(() => _userServices.GetAllNotesByUser());

            if (result.Count == 0) return BadRequest("Note not found");
   
            NoteToDTO(result, out converted);
            return Ok(converted);
        }

        private void NoteToDTO(List<Note> list, out List<NoteDTO> convertedList)
        {
            convertedList = new List<NoteDTO>();

            foreach (var note in list)
            {
                List<CategoryDTO> categoryList = new List<CategoryDTO>();
                List<ImageDTO> imageList = new List<ImageDTO>();

                if (note.Images.Count > 0)
                {
                    foreach (var image in note.Images)
                    {
                        ImageDTO imageDTO = new ImageDTO() { Id = image.Id, Title = image.Title, Data = image.Data };
                        imageList.Add(imageDTO);
                    }
                }
                if (note.CategoriesList.Count > 0)
                {
                    foreach (var category in note.CategoriesList)
                    {
                        CategoryDTO categoryDTO = new CategoryDTO() { Id = category.Id, Title = category.Title };
                        categoryList.Add(categoryDTO);
                    }
                }
                convertedList.Add(new NoteDTO()
                {
                    Id = note.Id,
                    Title = note.Title,
                    Content = note.Content,
                    IsPublic = note.IsPublic,
                    Created = note.Created,
                    Images = imageList,
                    Categories = categoryList,
                });
            }
        }
    }
}