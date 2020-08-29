using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;
using DeTai.ThucTap.Application.Interfaces;
using DeTai.ThucTap.Domain.Common;

namespace DeTai.ThucTap.Api.Areas.Admin.Pages.VocabularyPage
{
    public class CreateModel : PageModel
    {
        private readonly DeTai.ThucTap.Data.ApplicationContext _context;
        private readonly IManagerImages _ManagerImages;

        public CreateModel(
            DeTai.ThucTap.Data.ApplicationContext context,
            IManagerImages managerImages
            )
        {
            _context = context;
            _ManagerImages = managerImages;
        }

        public IActionResult OnGet()
        {
            ViewData["VocabularyCategoryId"] = new SelectList(_context.VocabularyCategories, "Id", "Name");
            return Page();
        }

        [BindProperty]
        public Vocabulary Vocabulary { get; set; }

        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                Vocabulary.Id = Guid.NewGuid();
                string filename = await _ManagerImages.SaveImageAsync(
                    Vocabulary.Image, Helper.PathImageVocabulary,
                    Vocabulary.Id.ToString());
                if (!string.IsNullOrEmpty(filename))
                {
                    Vocabulary.ImageUrl = filename;
                    _context.Add(Vocabulary);
                    await _context.SaveChangesAsync();
                    return RedirectToPage("./Index");
                }

            }
            return Page();
            //_context.Vocabularies.Add(Vocabulary);
            //await _context.SaveChangesAsync();

            //return RedirectToPage("./Index");
        }
    }
}
