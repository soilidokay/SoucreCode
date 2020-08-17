using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;

namespace DeTai.ThucTap.Api.Controllers
{ 
    public class VocabularyCategoriesController : ApiBaseController
    {
        private readonly ApplicationContext _context;

        public VocabularyCategoriesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/VocabularyCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VocabularyCategory>>> GetVocabularyCategories()
        {
            return await _context.VocabularyCategories.ToListAsync();
        }

        // GET: api/VocabularyCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VocabularyCategory>> GetVocabularyCategory(Guid id)
        {
            var vocabularyCategory = await _context.VocabularyCategories.FindAsync(id);

            if (vocabularyCategory == null)
            {
                return NotFound();
            }

            return vocabularyCategory;
        }

        // PUT: api/VocabularyCategories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVocabularyCategory(Guid id, VocabularyCategory vocabularyCategory)
        {
            if (id != vocabularyCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(vocabularyCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VocabularyCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/VocabularyCategories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<VocabularyCategory>> PostVocabularyCategory(VocabularyCategory vocabularyCategory)
        {
            _context.VocabularyCategories.Add(vocabularyCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVocabularyCategory", new { id = vocabularyCategory.Id }, vocabularyCategory);
        }

        // DELETE: api/VocabularyCategories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VocabularyCategory>> DeleteVocabularyCategory(Guid id)
        {
            var vocabularyCategory = await _context.VocabularyCategories.FindAsync(id);
            if (vocabularyCategory == null)
            {
                return NotFound();
            }

            _context.VocabularyCategories.Remove(vocabularyCategory);
            await _context.SaveChangesAsync();

            return vocabularyCategory;
        }

        private bool VocabularyCategoryExists(Guid id)
        {
            return _context.VocabularyCategories.Any(e => e.Id == id);
        }
    }
}
