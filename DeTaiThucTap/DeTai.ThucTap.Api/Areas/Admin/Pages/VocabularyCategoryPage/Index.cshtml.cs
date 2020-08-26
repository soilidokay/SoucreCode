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
    public class IndexModel : PageModel
    {
        private readonly DeTai.ThucTap.Data.ApplicationContext _context;

        public IndexModel(DeTai.ThucTap.Data.ApplicationContext context)
        {
            _context = context;
        }

        public IList<VocabularyCategory> VocabularyCategory { get;set; }

        public async Task OnGetAsync()
        {
            VocabularyCategory = await _context.VocabularyCategories
                .Include(v => v.User).ToListAsync();
        }
    }
}
