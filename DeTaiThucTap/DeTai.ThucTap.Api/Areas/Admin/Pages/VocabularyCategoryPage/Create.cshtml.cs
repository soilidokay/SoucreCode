using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Application.Interfaces;
using DeTai.ThucTap.Domain.Common;

namespace DeTai.ThucTap.Api.Areas.Admin.VocategoryCategoryPage
{
    public class CreateModel : PageModel
    {
        private readonly DeTai.ThucTap.Data.ApplicationContext _context;
        private readonly UserManager<ApplicationUser> _UserManager;
        private readonly IManagerImages _ManagerImages;
        public CreateModel(
            DeTai.ThucTap.Data.ApplicationContext context,
            UserManager<ApplicationUser> userManager,
            IManagerImages managerImages
            )
        {
            _context = context;
            _UserManager = userManager;
            _ManagerImages = managerImages;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public VocabularyCategory VocabularyCategory { get; set; }

        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                VocabularyCategory.Id = Guid.NewGuid();
                string filename = await _ManagerImages.SaveImageAsync(
                    VocabularyCategory.Image, Helper.PathImageCategory,
                    VocabularyCategory.Id.ToString());
                if (!string.IsNullOrEmpty(filename))
                {
                    var user = await _UserManager.GetUserAsync(HttpContext.User);
                    VocabularyCategory.UserId = user.Id;
                    VocabularyCategory.ImageUrl = filename;
                    _context.Add(VocabularyCategory);
                    await _context.SaveChangesAsync();
                    return RedirectToPage("./Index");
                }

            }
            return Page();
        }
    }
}
