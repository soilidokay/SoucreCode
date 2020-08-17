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
    public class LearningGoalsController : ApiBaseController
    {
        private readonly ApplicationContext _context;

        public LearningGoalsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/LearningGoals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LearningGoal>>> GetLearningGoals()
        {
            return await _context.LearningGoals.ToListAsync();
        }

        // GET: api/LearningGoals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LearningGoal>> GetLearningGoal(Guid id)
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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLearningGoal(Guid id, LearningGoal learningGoal)
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
        public async Task<ActionResult<LearningGoal>> PostLearningGoal(LearningGoal learningGoal)
        {
            _context.LearningGoals.Add(learningGoal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLearningGoal", new { id = learningGoal.Id }, learningGoal);
        }

        // DELETE: api/LearningGoals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LearningGoal>> DeleteLearningGoal(Guid id)
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

        private bool LearningGoalExists(Guid id)
        {
            return _context.LearningGoals.Any(e => e.Id == id);
        }
    }
}
