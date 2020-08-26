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
    public class DetailsModel : PageModel
    {
        private readonly DeTai.ThucTap.Data.ApplicationContext _context;

        public DetailsModel(DeTai.ThucTap.Data.ApplicationContext context)
        {
            _context = context;
        }

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
    }
}
