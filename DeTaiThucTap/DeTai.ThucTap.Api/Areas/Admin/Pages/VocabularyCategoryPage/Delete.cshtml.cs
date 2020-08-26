using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;

namespace DeTai.ThucTap.Api.Areas.Admin.VocategoryCategoryPage
{
    public class DeleteModel : PageModel
    {
        private readonly DeTai.ThucTap.Data.ApplicationContext _context;

        public DeleteModel(DeTai.ThucTap.Data.ApplicationContext context)
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
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            VocabularyCategory = await _context.VocabularyCategories.FindAsync(id);

            if (VocabularyCategory != null)
            {
                _context.VocabularyCategories.Remove(VocabularyCategory);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
