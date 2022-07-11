using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoteApp.Repository;
using NoteApp.Repository.DbContexts;
using NoteApp.Repository.Entities;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace NoteApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly NoteAppContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(NoteAppContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserDto request)
        {
            if (UserAlreadyExist(request.Email))
            {
                return BadRequest("User already exists");
            }

            if (!PasswordValidation(request.Password))
            {
                return BadRequest("Incorrect password. Password must contains: At least 8 characters, at least one uppercase letter and at least one special character");
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var user = new User(request.Email, passwordHash, passwordSalt);

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(user);
        }

        [HttpPost("login")]

        public ActionResult<string> Login(UserDto request)
        {
            var user = _context.Users.Where(u => u.Email == request.Email).FirstOrDefault();

            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong username or/and password");
            }

            string token = CreateToken(user);


            return Ok(token);
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            };
        }

        private bool UserAlreadyExist(string userEmail)
        {
            return _context.Users.Where(user => user.Email == userEmail).ToList().Count > 0;
        }
        private bool PasswordValidation(string password)
        {
            char[] specialChArray = @"%!@#$%^&*()?/>.<,:;'\|}]{[_~`+=-".ToCharArray();

            if (password.Length < 8)
            {
                return false;
            }
            if (!password.Any(char.IsUpper))
            {
                return false;
            }
            if (!password.Any(char.IsLower))
            {
                return false;
            }
            if (password.Contains(" "))
            {
                return false;
            }

            foreach (char ch in specialChArray)
            {
                if (password.Contains(ch))
                    return true;
            }
            return true;
        }
    }
}
