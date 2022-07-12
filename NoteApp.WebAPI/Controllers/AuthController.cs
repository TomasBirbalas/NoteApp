using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteApp.Repository;
using NoteApp.Repository.DbContexts;
using NoteApp.Repository.Entities;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using NoteApp.Repository.Models.DTO;

namespace NoteApp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly NoteAppContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration, NoteAppContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public ActionResult<string> Register([FromBody] RegisterUserDTO request)
        {
            if (UserAlreadyExist(request.Email))
            {
                return BadRequest("User already exists");
            }

            if (!PasswordValidation(request.Password))
            {
                return BadRequest("Incorrect password. Password must contains: At least 8 characters, at least one uppercase letter and at least one special character");
            }

            if(request.Password != request.PasswordConfirmation)
            {
                return BadRequest("Password doesnt match");
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var user = new User(request.Email, passwordHash, passwordSalt);

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Successfuly registered");
        }

        [HttpPost("changePassword")]
        public ActionResult<string> UpdatePassword([FromBody] ChangePasswordDTO request)
        {
            var user = _context.Users.Where(u => u.Email == request.Email).FirstOrDefault();

            if (!VerifyPasswordHash(request.CurrentPassword, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong username or/and password");
            }

            if (!PasswordValidation(request.NewPassword))
            {
                return BadRequest("Incorrect password. Password must contains: At least 8 characters, at least one uppercase letter and at least one special character");
            }

            if (request.NewPassword != request.PasswordConfirmation)
            {
                return BadRequest("Password doesnt match");
            }

            CreatePasswordHash(request.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Update(user);
            _context.SaveChanges();

            return Ok("Usser Password is changed");
        }

        [HttpPost("login")]

        public ActionResult<string> Login([FromBody] UserDto request)
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

            //var refreshToken = GenerateRefreshToken();
            //SetRefreshToken(refreshToken, user);

            return Ok(token );
        }


        //private RefreshToken GenerateRefreshToken()
        //{
        //    var refreshToken = new RefreshToken
        //    {
        //        Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
        //        Created = DateTime.Now,
        //        Expires = DateTime.Now.AddMinutes(15),
        //    };

        //    return refreshToken;
        //}

        //private void SetRefreshToken(RefreshToken newRefreshToken, User user)
        //{
        //    var cookieOptions = new CookieOptions
        //    {
        //        HttpOnly = true,
        //        Expires = newRefreshToken.Expires
        //    };
        //    Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
            
        //    user.RefreshTokens.Add(newRefreshToken);
        //    _context.RefreshTokens?.Add(newRefreshToken);
        //    _context.SaveChanges();
        //}

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
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
