using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;
using DeTai.ThucTap.Domain.Common;
using Microsoft.AspNetCore.Identity;
using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Application.Interfaces;
using DeTai.ThucTap.Domain.EntityBases;
using DeTai.ThucTap.Domain.DTO;

namespace DeTai.ThucTap.Api.Controllers
{
    public class VocabulariesController : ApiBaseController
    {
        private readonly ApplicationContext _context;
        private readonly UserManager<ApplicationUser> _UserManager;
        private readonly IManagerImages _ManagerImages;

        public VocabulariesController(
            ApplicationContext context,
            IManagerImages managerImages,
            UserManager<ApplicationUser> userManager

            )
        {
            _context = context;
            _ManagerImages = managerImages;
            _UserManager = userManager;
        }

        // GET: api/Vocabularies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VocabularyBase>>> GetVocabularies([FromQuery] Guid? CategoryId)
        {

            var sqry = _context.Vocabularies
            .Where(x => x.IsShare && x.IsPublish);
            if (CategoryId.HasValue)
            {
                sqry = sqry.Where(x => x.VocabularyCategoryId == CategoryId);
            }
            var result = await sqry.Select(x => new VocabularyDTO(x)).ToListAsync();


            foreach (var item in result)
            {
                item.Phrases = _context.Phrases
                    .Where(y => y.VocabularyId == item.Id)
                    .Take(1)
                    .Select(y => y as PhraseBase).ToArray();
            }

            return Ok(result);
        }
        [HttpGet]
        // GET: api/Vocabularies/5
        public async Task<ActionResult<VocabularyDTO>> GetVocabulary([FromQuery] Guid VocabularyId)
        {
            var Temp = (await _context.Vocabularies.Include(x => x.Pronunciations)
                .Include(x => x.Phrases).FirstOrDefaultAsync(x => x.Id == VocabularyId));

            if (Temp == null)
            {
                return NotFound();
            }
            else
            {
                return new VocabularyDTO(Temp)
                {
                    Phrases = Temp.Phrases.Select(x => x as PhraseBase),
                    Pronunciations = Temp.Pronunciations.Select(x => x as PronunciationBase)
                };
            }
        }
        [HttpGet]
        // GET: api/Vocabularies/5
        public async Task<ActionResult<IEnumerable<VocabularyBase>>> GetVocabularyWithLearnings([FromQuery] Guid LearningGoalId)
        {
            var temp = await _context.LearningGoalDetails
                .Include(x => x.Vocabulary)
                .Where(x => x.LearningGoalId == LearningGoalId)
                .Select(x => x.Vocabulary)
                .ToArrayAsync();
            if (temp == null) return NoContent();
            return Ok(temp);
        }
        // PUT: api/Vocabularies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public async Task<IActionResult> PutVocabulary([FromQuery] Guid id, [FromForm] Vocabulary vocabulary)
        {
            //if (id != vocabulary.Id)
            //{
            //    return BadRequest();
            //}

            //_context.Entry(vocabulary).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!VocabularyExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return NoContent();
            if (id != vocabulary.Id)
            {
                return BadRequest();
            }

            string filename = null;
            if (vocabulary.Image != null)
            {
                filename = await _ManagerImages.SaveImageAsync(
                   vocabulary.Image,
                   Helper.PathImageVocabulary,
                   vocabulary.Id.ToString()
                   );
            }

            if (!string.IsNullOrEmpty(filename))
            {
                vocabulary.ImageUrl = filename;
            }

            _context.Entry(vocabulary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException err)
            {
                if (!VocabularyExists(id))
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

        // POST: api/Vocabularies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<VocabularyBase>> PostVocabulary([FromForm] Vocabulary vocabulary)
        {
            if (ModelState.IsValid)
            {
                vocabulary.Id = Guid.NewGuid();
                string filename = await _ManagerImages.SaveImageAsync(
                    vocabulary.Image,
                    Helper.PathImageVocabulary,
                    vocabulary.Id.ToString()
                    ); ;
                if (!string.IsNullOrEmpty(filename))
                {
                    vocabulary.ImageUrl = filename;
                    vocabulary.IsPublish = true;
                    vocabulary.IsShare = true;
                    vocabulary = _context.Vocabularies.Add(vocabulary).Entity;
                    await _context.SaveChangesAsync();
                    vocabulary.Image = null;
                    return vocabulary;
                }

            }

            return BadRequest(ModelState);

        }

        // DELETE: api/Vocabularies/5
        [HttpDelete]
        public async Task<ActionResult<VocabularyBase>> DeleteVocabulary([FromQuery] Guid id)
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
