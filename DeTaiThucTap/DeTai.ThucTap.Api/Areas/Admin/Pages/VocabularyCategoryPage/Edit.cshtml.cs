using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;

namespace DeTai.ThucTap.Api.Areas.Admin.VocategoryCategoryPage
{
    public class EditModel : PageModel
    {
        private readonly DeTai.ThucTap.Data.ApplicationContext _context;

        public EditModel(DeTai.ThucTap.Data.ApplicationContext context)
        {
            _context = context;
        }

        [BindProperty]
        public VocabularyCategory VocabularyCategory { get; set; }

        public async Task<IActionResult> OnGetAsync(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            VocabularyCategory = await _context.VocabularyCategories
                .Include(v => v.User).FirstOrDefaultAsync(m => m.Id == id);

            if (VocabularyCategory == null)
            {
                return NotFound();
            }
            ViewData["GroupCategoryId"] = new SelectList(_context.GroupCategories.Where(x => !x.IsOwner), "Id", "Name");
            ViewData["UserId"] = new SelectList(_context.Users.Where(x => x.Email == HttpContext.User.Identity.Name), "Id", "Email");

            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(VocabularyCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VocabularyCategoryExists(VocabularyCategory.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool VocabularyCategoryExists(Guid id)
        {
            return _context.VocabularyCategories.Any(e => e.Id == id);
        }
    }
}
