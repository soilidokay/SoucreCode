using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;

namespace DeTai.ThucTap.Api.Controllers
{ 
    public class VocabulariesController : ApiBaseController
    {
        private readonly ApplicationContext _context;

        public VocabulariesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Vocabularies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vocabulary>>> GetVocabularies()
        {
            return await _context.Vocabularies.ToListAsync();
        }

        // GET: api/Vocabularies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vocabulary>> GetVocabulary(Guid id)
        {
            var vocabulary = await _context.Vocabularies.FindAsync(id);

            if (vocabulary == null)
            {
                return NotFound();
            }

            return vocabulary;
        }

        // PUT: api/Vocabularies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVocabulary(Guid id, Vocabulary vocabulary)
        {
            if (id != vocabulary.Id)
            {
                return BadRequest();
            }

            _context.Entry(vocabulary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VocabularyExists(id))
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

        // POST: api/Vocabularies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Vocabulary>> PostVocabulary(Vocabulary vocabulary)
        {
            _context.Vocabularies.Add(vocabulary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVocabulary", new { id = vocabulary.Id }, vocabulary);
        }

        // DELETE: api/Vocabularies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Vocabulary>> DeleteVocabulary(Guid id)
        {
            var vocabulary = await _context.Vocabularies.FindAsync(id);
            if (vocabulary == null)
            {
                return NotFound();
            }

            _context.Vocabularies.Remove(vocabulary);
            await _context.SaveChangesAsync();

            return vocabulary;
        }

        private bool VocabularyExists(Guid id)
        {
            return _context.Vocabularies.Any(e => e.Id == id);
        }
    }
}
