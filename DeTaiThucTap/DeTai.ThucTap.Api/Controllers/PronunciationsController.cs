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
using DeTai.ThucTap.Domain.Common;
using DeTai.ThucTap.Application.Interfaces;

namespace DeTai.ThucTap.Api.Controllers
{
    public class PronunciationsController : ApiBaseController
    {
        private readonly ApplicationContext _context;
        private readonly IManagerImages _ManagerImages;

        public PronunciationsController(
            ApplicationContext context,
            IManagerImages managerImages

            )
        {
            _context = context;
            _ManagerImages = managerImages;
        }

        // GET: api/Pronunciations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PronunciationBase>>> GetPronuciations()
        {
            return await _context.Pronuciations.ToListAsync();
        }

        // GET: api/Pronunciations/5
        [HttpGet]
        public async Task<ActionResult<PronunciationBase>> GetPronunciation([FromQuery] Guid id)
        {
            var pronunciation = await _context.Pronuciations.FindAsync(id);

            if (pronunciation == null)
            {
                return NotFound();
            }

            return pronunciation;
        }

        // PUT: api/Pronunciations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public async Task<IActionResult> PutPronunciation([FromQuery] Guid id, [FromForm] Pronunciation pronunciation)
        {
            //if (id != pronunciation.Id)
            //{
            //    return BadRequest();
            //}

            //_context.Entry(pronunciation).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!PronunciationExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return NoContent();

            if (id != pronunciation.Id)
            {
                return BadRequest();
            }

            string filename = null;
            if (pronunciation.Audio != null)
            {
                filename = await _ManagerImages.SaveImageAsync(
                   pronunciation.Audio,
                   Helper.PathAudioPronunciation,
                   pronunciation.Id.ToString()
                   );
            }

            if (!string.IsNullOrEmpty(filename))
            {
                pronunciation.LinkFile = filename;
            }

            _context.Entry(pronunciation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException err)
            {
                if (!PronunciationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw err;
                }
            }
            return NoContent();
        }

        // POST: api/Pronunciations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PronunciationBase>> PostPronunciation([FromForm] Pronunciation pronunciation)
        {
            if (ModelState.IsValid)
            {
                pronunciation.Id = Guid.NewGuid();
                string filename = await _ManagerImages.SaveImageAsync(
                    pronunciation.Audio,
                    Helper.PathAudioPronunciation,
                    pronunciation.Id.ToString()
                    ); ;
                if (!string.IsNullOrEmpty(filename))
                {
                    pronunciation.LinkFile = filename;
                    pronunciation = _context.Pronuciations.Add(pronunciation).Entity;
                    await _context.SaveChangesAsync();
                    pronunciation.Audio = null;
                    return pronunciation;
                }

            }

            return BadRequest(ModelState);
            //_context.Pronuciations.Add(pronunciation);
            //await _context.SaveChangesAsync();

            //return CreatedAtAction("GetPronunciation", new { id = pronunciation.Id }, pronunciation);
        }

        // DELETE: api/Pronunciations/5
        [HttpDelete]
        public async Task<ActionResult<PronunciationBase>> DeletePronunciation([FromQuery] Guid id)
        {
            var pronunciation = await _context.Pronuciations.FindAsync(id);
            if (pronunciation == null)
            {
                return NotFound();
            }

            _context.Pronuciations.Remove(pronunciation);
            await _context.SaveChangesAsync();

            return pronunciation;
        }

        private bool PronunciationExists(Guid id)
        {
            return _context.Pronuciations.Any(e => e.Id == id);
        }
    }
}
