using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;

namespace DeTai.ThucTap.Api.Areas.Admin.VocategoryCategoryPage
{
    public class CreateModel : PageModel
    {
        private readonly DeTai.ThucTap.Data.ApplicationContext _context;

        public CreateModel(DeTai.ThucTap.Data.ApplicationContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
        ViewData["GroupCategoryId"] = new SelectList(_context.GroupCategories.Where(x=>!x.IsOwner), "Id", "Name");
        ViewData["UserId"] = new SelectList(_context.Users.Where(x=>x.Email == HttpContext.User.Identity.Name), "Id", "Email");
            return Page();
        }

        [BindProperty]
        public VocabularyCategory VocabularyCategory { get; set; }

        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.VocabularyCategories.Add(VocabularyCategory);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
