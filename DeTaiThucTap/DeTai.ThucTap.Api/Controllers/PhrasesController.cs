using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;
using DeTai.ThucTap.Domain.EntityBases;

namespace DeTai.ThucTap.Api.Controllers
{
    public class PhrasesController : ApiBaseController
    {
        private readonly ApplicationContext _context;

        public PhrasesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Phrases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhraseBase>>> GetPhrases()
        {
            return await _context.Phrases.ToListAsync();
        }

        // GET: api/Phrases/5
        [HttpGet]
        public async Task<ActionResult<PhraseBase>> GetPhrase([FromQuery] Guid id)
        {
            var phrase = await _context.Phrases.FindAsync(id);

            if (phrase == null)
            {
                return NotFound();
            }

            return phrase;
        }

        // PUT: api/Phrases/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public async Task<IActionResult> PutPhrase([FromQuery] Guid id, [FromForm] Phrase phrase)
        {
            if (id != phrase.Id)
            {
                return BadRequest();
            }

            _context.Entry(phrase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhraseExists(id))
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

        // POST: api/Phrases
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PhraseBase>> PostPhrase([FromForm] Phrase phrase)
        {
            _context.Phrases.Add(phrase);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhrase", new { id = phrase.Id }, phrase);
        }

        // DELETE: api/Phrases/5
        [HttpDelete]
        public async Task<ActionResult<PhraseBase>> DeletePhrase([FromQuery] Guid id)
        {
            var phrase = await _context.Phrases.FindAsync(id);
            if (phrase == null)
            {
                return NotFound();
            }

            _context.Phrases.Remove(phrase);
            await _context.SaveChangesAsync();

            return phrase;
        }

        private bool PhraseExists(Guid id)
        {
            return _context.Phrases.Any(e => e.Id == id);
        }
    }
}
