using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;
using DeTai.ThucTap.Domain.EntityBases;
using Microsoft.AspNetCore.Identity;
using DeTai.ThucTap.Data.CustomEntites;

namespace DeTai.ThucTap.Api.Controllers
{
    public class LearningGoalsController : ApiBaseController
    {
        private readonly ApplicationContext _context;
        private readonly UserManager<ApplicationUser> _UserManager;

        public LearningGoalsController(
            ApplicationContext context,
            UserManager<ApplicationUser> userManager
            )
        {
            _context = context;
            _UserManager = userManager;
        }
        [HttpPost]
        public async Task<ActionResult> PostCategoryToLearningGoal([FromForm] Guid CategoryId, [FromForm] Guid LearningGoalId)
        {
            var temps = await _context.VocabularyCategories.FindAsync(CategoryId);

            if (temps == null) return NotFound();

            var sqy = _context.Vocabularies
                .Where(x => x.VocabularyCategoryId == CategoryId)
                .Select(x => x.Id);
            var sqrDetail = _context.LearningGoalDetails
                .Where(x => x.LearningGoalId == LearningGoalId)
                .Select(x => x.VocabularyId);

            var tempId = await (from VocabId in sqy
                                join deteailId in sqrDetail
                                on VocabId equals deteailId into DataAll
                                from Data in DataAll.DefaultIfEmpty()
                                where Data == null
                                select VocabId
                              ).ToArrayAsync();

            var LearningGoal = await _context.LearningGoals.FindAsync(LearningGoalId);
            if (LearningGoal == null) return NotFound();

            foreach (var item in tempId)
            {
                _context.LearningGoalDetails.Add(new LearningGoalDetails
                {
                    VocabularyId = item,
                    LearningGoalId = LearningGoal.Id
                });
            }
            await _context.SaveChangesAsync();
            return Ok();
        }


        [HttpPost]
        public async Task<ActionResult> PostVocabularyToLearningGoal([FromForm] Guid VocabularyId, [FromForm] Guid LearningGoalId)
        {
            var temps = await _context.Vocabularies.FindAsync(VocabularyId);

            if (temps == null) return NotFound();
            var Detail = await _context.LearningGoalDetails
                .SingleOrDefaultAsync(x =>
                x.LearningGoalId == LearningGoalId
                && x.VocabularyId == VocabularyId);

            if (Detail != null) return Ok();

            var LearningGoal = await _context.LearningGoals.FindAsync(LearningGoalId);
            if (LearningGoal == null) return NotFound();


            _context.LearningGoalDetails.Add(new LearningGoalDetails
            {
                VocabularyId = VocabularyId,
                LearningGoalId = LearningGoal.Id
            });

            await _context.SaveChangesAsync();
            return Ok();
        }

        // GET: api/LearningGoals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LearningGoalBase>>> GetLearningGoals()
        {
            var user = await _UserManager.GetUserAsync(HttpContext.User);
            return await _context.LearningGoals
                .Where(x => x.UserId == user.Id)
                .Select(x => x as LearningGoalBase)
                .ToListAsync();
        }

        // GET: api/LearningGoals/5
        [HttpGet]
        public async Task<ActionResult<LearningGoalBase>> GetLearningGoal(Guid id)
        {
            var learningGoal = await _context.LearningGoals.FindAsync(id);

            if (learningGoal == null)
            {
                return NotFound();
            }

            return learningGoal;
        }

        // PUT: api/LearningGoals/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public async Task<IActionResult> PutLearningGoal(Guid id, [FromForm] LearningGoal learningGoal)
        {
            if (id != learningGoal.Id)
            {
                return BadRequest();
            }

            _context.Entry(learningGoal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LearningGoalExists(id))
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

        // POST: api/LearningGoals
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LearningGoalBase>> PostLearningGoal([FromForm] LearningGoal learningGoal)
        {
            var user = await _UserManager.GetUserAsync(HttpContext.User);
            learningGoal.UserId = user.Id;
            _context.LearningGoals.Add(learningGoal);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetLearningGoal", new { id = learningGoal.Id }, learningGoal);
        }

        // DELETE: api/LearningGoals/5
        [HttpDelete]
        public async Task<ActionResult<LearningGoalBase>> DeleteLearningGoal(Guid id)
        {
            var learningGoal = await _context.LearningGoals.FindAsync(id);
            if (learningGoal == null)
            {
                return NotFound();
            }

            _context.LearningGoals.Remove(learningGoal);
            await _context.SaveChangesAsync();

            return learningGoal;
        }

        // DELETE: api/LearningGoals/5
        [HttpDelete]
        public async Task<ActionResult<LearningGoalDetails>> DeleteVocabulary(
           [FromQuery] Guid LearningGoalId,
           [FromQuery] Guid VocabularyId
        )
        {
            var LearningGoalDetail = await _context.LearningGoalDetails
                .SingleOrDefaultAsync(x =>
                    x.LearningGoalId == LearningGoalId
                    && x.VocabularyId == VocabularyId
                );
            if (LearningGoalDetail == null)
            {
                return NotFound();
            }

            _context.LearningGoalDetails.Remove(LearningGoalDetail);
            await _context.SaveChangesAsync();

            return LearningGoalDetail;
        }

        private bool LearningGoalExists(Guid id)
        {
            return _context.LearningGoals.Any(e => e.Id == id);
        }
    }
}
