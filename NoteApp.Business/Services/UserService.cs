using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NoteApp.Business.Interfaces;
using NoteApp.Repository.DbContexts;
using NoteApp.Repository.Entities;
using NoteApp.Repository.Entities.NoteEntity;
using NoteApp.Repository.Models;
using System.Security.Claims;

namespace NoteApp.Business.Services
{
    public class UserService : IUserService
    {
        private readonly NoteAppContext _context;
        private readonly IHttpContextAccessor _httpContext;

        public UserService(NoteAppContext context, IHttpContextAccessor httpContext)
        {
            _context = context;
            _httpContext = httpContext;
        }

        public string AddUserDetails(string name, string surname, Gender gender, DateTime dob)
        {
            Guid userId = GetCurrentUserId();
            var userDetails = new UserDetails(name, surname, gender, dob);
            userDetails.UserId = userId;

            _context.Add(userDetails);
            _context.SaveChanges();

            return "Successfully added";
        }
        public User GetCurrentUser()
        {
            Guid userId = GetCurrentUserId();
            var user = _context.Users
                .Include(u => u.NotesList)
                .Where(u => u.Id == userId)
                .First();

            return user;
        }
        public Guid GetCurrentUserId()
        {
            string? userId = _httpContext.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                throw new Exception("User not found");
            }

            if (Guid.TryParse(userId, out Guid userIdParsed))
            {
                return userIdParsed;
            }
            else
            {
                throw new Exception("Cant be Parsed");
            }
        }
    }
}