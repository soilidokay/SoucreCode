using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;

namespace DeTai.ThucTap.Api.Areas.Admin.Pages.GroupCategoryPage
{
    public class DeleteModel : PageModel
    {
        private readonly DeTai.ThucTap.Data.ApplicationContext _context;

        public DeleteModel(DeTai.ThucTap.Data.ApplicationContext context)
        {
            _context = context;
        }

        [BindProperty]
        public GroupCategory GroupCategory { get; set; }

        public async Task<IActionResult> OnGetAsync(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            GroupCategory = await _context.GroupCategories.FirstOrDefaultAsync(m => m.Id == id);

            if (GroupCategory == null)
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

            GroupCategory = await _context.GroupCategories.FindAsync(id);

            if (GroupCategory != null)
            {
                _context.GroupCategories.Remove(GroupCategory);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
