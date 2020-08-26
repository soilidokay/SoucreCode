using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;
using DeTai.ThucTap.Application.Interfaces;
using DeTai.ThucTap.Domain.DTO;
using DeTai.ThucTap.Data.Attributes;

namespace DeTai.ThucTap.Api.Controllers
{
    [AuthorizeJWT]
    public class GroupCategoriesController : ApiBaseController
    {
        private readonly ApplicationContext _context;
        private readonly IGroupCategoryService _IService;

        public GroupCategoriesController(ApplicationContext context, IGroupCategoryService service)
        {
            _context = context;
            _IService = service;
        }

        // GET: api/GroupCategories
        [HttpGet]
        public async Task<ActionResult<List<GroupCategoryDTO>>> GetGroupCategories()
        {
            return await _IService.GetGroupCategories();
        }

        // GET: api/GroupCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GroupCategory>> GetGroupCategory(Guid id)
        {
            var groupCategory = await _context.GroupCategories.FindAsync(id);

            if (groupCategory == null)
            {
                return NotFound();
            }

            return groupCategory;
        }

        // PUT: api/GroupCategories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroupCategory(Guid id, GroupCategory groupCategory)
        {
            if (id != groupCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(groupCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupCategoryExists(id))
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

        // POST: api/GroupCategories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<GroupCategory>> PostGroupCategory(GroupCategory groupCategory)
        {
            _context.GroupCategories.Add(groupCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGroupCategory", new { id = groupCategory.Id }, groupCategory);
        }

        // DELETE: api/GroupCategories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GroupCategory>> DeleteGroupCategory(Guid id)
        {
            var groupCategory = await _context.GroupCategories.FindAsync(id);
            if (groupCategory == null)
            {
                return NotFound();
            }

            _context.GroupCategories.Remove(groupCategory);
            await _context.SaveChangesAsync();

            return groupCategory;
        }

        private bool GroupCategoryExists(Guid id)
        {
            return _context.GroupCategories.Any(e => e.Id == id);
        }
    }
}
