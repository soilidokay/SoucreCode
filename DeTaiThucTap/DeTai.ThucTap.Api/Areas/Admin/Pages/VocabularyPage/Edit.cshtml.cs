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

namespace DeTai.ThucTap.Api.Areas.Admin.Pages.VocabularyPage
{
    public class EditModel : PageModel
    {
        private readonly DeTai.ThucTap.Data.ApplicationContext _context;

        public EditModel(DeTai.ThucTap.Data.ApplicationContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Vocabulary Vocabulary { get; set; }

        public async Task<IActionResult> OnGetAsync(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Vocabulary = await _context.Vocabularies
                .Include(v => v.VocabularyCategory).FirstOrDefaultAsync(m => m.Id == id);

            if (Vocabulary == null)
            {
                return NotFound();
            }
           ViewData["VocabularyCategoryId"] = new SelectList(_context.VocabularyCategories, "Id", "Name");
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

            _context.Attach(Vocabulary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VocabularyExists(Vocabulary.Id))
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

        private bool VocabularyExists(Guid id)
        {
            return _context.Vocabularies.Any(e => e.Id == id);
        }
    }
}
