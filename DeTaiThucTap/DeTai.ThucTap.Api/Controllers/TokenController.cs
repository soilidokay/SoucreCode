using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Data.OptionSettings;
using DeTai.ThucTap.Domain.Common;
using DeTai.ThucTap.Domain.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DeTai.ThucTap.Api.Controllers
{
    [AllowAnonymous]
    public class TokenController : ApiBaseController
    {
        private readonly UserManager<ApplicationUser> _UserManager;
        private readonly SignInManager<ApplicationUser> _SignInManager;
        private readonly RoleManager<IdentityRole> _RoleManager;
        private readonly JwtSetting _JwtSetting;
        public TokenController(
            UserManager<ApplicationUser> userManager,
            JwtSetting jwtSetting,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager
            )
        {
            _UserManager = userManager;
            _JwtSetting = jwtSetting;
            _SignInManager = signInManager;
            _RoleManager = roleManager;
        }
        [HttpPost]
        public async Task AddRole(string Name)
        {
            // await _SignInManager.SignInAsync(await _UserManager.FindByNameAsync("tainguyen.ntt.97@gmail.com"),true);
            //   await _SignInManager.SignOutAsync();
            //await _RoleManager.CreateAsync(new IdentityRole { Name = "Admin" });
            //await _RoleManager.CreateAsync(new IdentityRole { Name = "User" });
            //await _UserManager.AddToRoleAsync(await _UserManager.FindByNameAsync("tainguyen.ntt.97@gmail.com"), "Admin");
        }
        [HttpGet]
        public async Task<IActionResult> LogOut()
        {
            var user = await _UserManager.GetUserAsync(HttpContext.User);
            if (user == null) return NotFound();
            var resut = await _UserManager.RemoveAuthenticationTokenAsync(user, Helper.LoginProvider, Helper.Purpose);
            return Ok(resut.Succeeded);
        }
        private async Task<ApplicationUser> CheckLogin(UserDTO userDTO)
        {
            var user = await _UserManager.FindByEmailAsync(userDTO.UserName);
            if (user == null) return null;
            var result = await _UserManager.CheckPasswordAsync(user, userDTO.PassWord);
            return user;
        }
        private async Task<string> GenerateToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_JwtSetting.SecretKey);
            var claims = new List<Claim>();
            var listRoles = await _UserManager.GetRolesAsync(user);
            if (listRoles != null)
                foreach (var item in listRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, item));
                }
            claims.Add(new Claim(ClaimTypes.Name, user.Email));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(_JwtSetting.TokenExpireTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            await _UserManager.SetAuthenticationTokenAsync(user, Helper.LoginProvider, Helper.Purpose, tokenString);
            return tokenString;
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromForm] UserDTO userDTO)
        {
            var result = await _SignInManager.PasswordSignInAsync(userDTO.UserName, userDTO.PassWord, false, true);
            if (result.Succeeded)
            {
                return Ok(await GenerateToken(await _UserManager.FindByNameAsync(userDTO.UserName)));
            }
            else
            {
                return BadRequest("Login information  is incorrect!");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Register([FromForm] UserDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = new ApplicationUser
            {
                UserName = userDTO.UserName,
                Email = userDTO.UserName
            };
            var result = await _UserManager.CreateAsync(user, userDTO.PassWord);
            await _UserManager.AddToRoleAsync(user, "User");
            if (result.Succeeded)
            {
                return Ok(await GenerateToken(user));
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
    }
}

