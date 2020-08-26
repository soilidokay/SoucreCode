using DeTai.ThucTap.Application.Interfaces;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Domain.Common;
using DeTai.ThucTap.Domain.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeTai.ThucTap.Application.Implementation
{
    public class GroupCategoryService : ServiceBase, IGroupCategoryService
    {
        private readonly RoleManager<IdentityRole> _RoleManager;

        public GroupCategoryService(ApplicationContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IHttpContextAccessor httpContextAccessor,
            RoleManager<IdentityRole> roleManager
            )
            : base(context, userManager, signInManager, httpContextAccessor)
        {
            _RoleManager = roleManager;
        }

        public async Task<List<GroupCategoryDTO>> GetGroupCategories()
        {
            var temps = await _DbContext.GroupCategories.Select(x => new GroupCategoryDTO(x)).ToListAsync();
            var item = temps.Find(x => x.Id == Helper.GroupAdmin);
            if (item == null) return null;
            item.VocabularyCategories = await (from Category in _DbContext.VocabularyCategories
                                               join userrole in _DbContext.UserRoles.Where(x => x.RoleId == Helper.RoleAmidn)
                                               on Category.UserId equals userrole.UserId
                                               select Category).ToListAsync();

            var User = await _UserManager.GetUserAsync(_HttpContent.User);
            item = temps.Find(x => x.Id == Helper.GroupOwner);
            item.VocabularyCategories = await _DbContext.VocabularyCategories.Where(x => x.UserId == User.Id).ToListAsync();

            item = temps.Find(x => x.Id == Helper.GroupOther);
            item.VocabularyCategories = await (from Category in _DbContext.VocabularyCategories.Where(x=>x.UserId != User.Id)
                                               join userrole in _DbContext.UserRoles.Where(x => x.RoleId == Helper.RoleUser)
                                               on Category.UserId equals userrole.UserId
                                               select Category
                                         ).ToListAsync();
            return temps;
        }
    }
}
