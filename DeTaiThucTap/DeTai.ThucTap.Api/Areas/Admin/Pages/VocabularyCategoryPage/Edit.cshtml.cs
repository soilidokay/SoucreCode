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
using DeTai.ThucTap.Application.Interfaces;
using DeTai.ThucTap.Domain.Common;

namespace DeTai.ThucTap.Api.Areas.Admin.VocategoryCategoryPage
{
    public class EditModel : PageModel
    {
        private readonly DeTai.ThucTap.Data.ApplicationContext _context;
        private readonly IManagerImages _ManagerImages;

        public EditModel(
            DeTai.ThucTap.Data.ApplicationContext context,
            IManagerImages managerImages
            )
        {
            _context = context;
            _ManagerImages = managerImages;
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
                if (VocabularyCategory.Image != null)
                {
                    string filename = await _ManagerImages.SaveImageAsync(
                        VocabularyCategory.Image, Helper.PathImageCategory, VocabularyCategory.Id.ToString());
                    if (string.IsNullOrEmpty(filename))
                    {
                        throw new Exception("Save is fail!");
                    }
                    else
                    {
                        VocabularyCategory.ImageUrl = filename;
                    }
                }
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
