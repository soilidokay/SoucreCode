using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Domain.EntityBases;

namespace DeTai.ThucTap.Api.Controllers
{
    public class CalendarRemindersController : ApiBaseController
    {
        private readonly ApplicationContext _context;
        private readonly UserManager<ApplicationUser> _UserManager;

        public CalendarRemindersController(
            ApplicationContext context,
            UserManager<ApplicationUser> userManager

            )
        {
            _context = context;
            _UserManager = userManager;
        }

        // GET: api/CalendarReminders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CalendarReminderBase>>> GetCalendarReminders()
        {
            var User = await _UserManager.GetUserAsync(HttpContext.User);
            return await _context.CalendarReminders
                .Where(x => x.UserId == User.Id)
                .Select(x => x as CalendarReminderBase)
                .ToListAsync();
        }

        // GET: api/CalendarReminders/5
        [HttpGet]
        public async Task<ActionResult<CalendarReminderBase>> GetCalendarReminder(Guid id)
        {
            var calendarReminder = await _context.CalendarReminders.FindAsync(id);

            if (calendarReminder == null)
            {
                return NotFound();
            }

            return calendarReminder;
        }

        // PUT: api/CalendarReminders/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public async Task<IActionResult> PutCalendarReminder(Guid id, [FromForm] CalendarReminder calendarReminder)
        {
            if (id != calendarReminder.Id)
            {
                return BadRequest();
            }

            _context.Entry(calendarReminder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CalendarReminderExists(id))
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

        // POST: api/CalendarReminders
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CalendarReminderBase>> PostCalendarReminder([FromForm] CalendarReminder calendarReminder)
        {
            var User = await _UserManager.GetUserAsync(HttpContext.User);
            calendarReminder.UserId = User.Id;
            _context.CalendarReminders.Add(calendarReminder);
            try
            {

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CalendarReminderExists(calendarReminder.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCalendarReminder", new { id = calendarReminder.IdLearningGoal }, calendarReminder);
        }

        // DELETE: api/CalendarReminders/5
        [HttpDelete]
        public async Task<ActionResult<CalendarReminderBase>> DeleteCalendarReminder(Guid id)
        {
            var calendarReminder = await _context.CalendarReminders.FindAsync(id);
            if (calendarReminder == null)
            {
                return NotFound();
            }

            _context.CalendarReminders.Remove(calendarReminder);
            await _context.SaveChangesAsync();

            return calendarReminder;
        }

        private bool CalendarReminderExists(Guid id)
        {
            return _context.CalendarReminders.Any(e => e.Id == id);
        }
    }
}
