using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoteApp.Business.Interfaces;

namespace NoteApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryServices _categoryServices;
        public CategoryController(ICategoryServices category)
        {
            _categoryServices = category;
        }

        [HttpPost("AddNote"), Authorize]
        public IActionResult DisplayAllCategories(string title)
        {
            _categoryServices.CreateNewCategory(title);
            return Ok($"Note created");
        }
    }
}
