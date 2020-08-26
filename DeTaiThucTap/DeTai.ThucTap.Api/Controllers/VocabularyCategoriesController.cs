using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeTai.ThucTap.Data;
using DeTai.ThucTap.Domain.Entities;
using DeTai.ThucTap.Domain.DTO;
using DeTai.ThucTap.Application.Interfaces;
using Microsoft.AspNetCore.Identity;
using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Domain.Common;
using DeTai.ThucTap.Domain.EntityBases;

namespace DeTai.ThucTap.Api.Controllers
{
    public class VocabularyCategoriesController : ApiBaseController
    {
        private readonly ApplicationContext _context;
        private readonly UserManager<ApplicationUser> _UserManager;
        private readonly IManagerImages _ManagerImages;
        public VocabularyCategoriesController(
            ApplicationContext context,
            IManagerImages managerImages,
            UserManager<ApplicationUser> userManager
            )
        {
            _context = context;
            _ManagerImages = managerImages;
            _UserManager = userManager;
        }

        // GET: api/VocabularyCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VocabularyCategoryBase>>> GetVocabularyCategories([FromQuery] Guid GroupId)
        {
            var User = await _UserManager.GetUserAsync(HttpContext.User);

            if (GroupId == Helper.GroupAdmin)
            {
                return await (from Category in _context.VocabularyCategories
                              join userrole in _context.UserRoles.Where(x => x.RoleId == Helper.RoleAmidn)
                              on Category.UserId equals userrole.UserId
                              select Category as VocabularyCategoryBase).ToListAsync();
            }
            else if (GroupId == Helper.GroupOwner)
            {
                return await _context.VocabularyCategories.Where(x => x.UserId == User.Id)
                    .Select(x => x as VocabularyCategoryBase)
                    .ToListAsync();
            }
            else
            {
                return await (from Category in _context.VocabularyCategories.Where(x => x.UserId != User.Id)
                              join userrole in _context.UserRoles.Where(x => x.RoleId == Helper.RoleUser)
                              on Category.UserId equals userrole.UserId
                              select Category as VocabularyCategoryBase).ToListAsync();
            }
        }

        // GET: api/VocabularyCategories/5
        [HttpGet]
        public async Task<ActionResult<VocabularyCategoryBase>> GetVocabularyCategory([FromQuery] Guid id)
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
        [HttpPut]
        public async Task<IActionResult> PutVocabularyCategory([FromQuery] Guid id, [FromForm] VocabularyCategory vocabularyCategory)
        {
            if (id != vocabularyCategory.Id)
            {
                return BadRequest();
            }

            string filename = null;
            if (vocabularyCategory.Image != null)
            {
                filename = await _ManagerImages.SaveImageAsync(
                   vocabularyCategory.Image,
                   Helper.PathImageCategory,
                   vocabularyCategory.Id.ToString()
                   );
            }

            if (!string.IsNullOrEmpty(filename))
            {
                vocabularyCategory.ImageUrl = filename;
            }

            _context.Entry(vocabularyCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException err)
            {
                if (!VocabularyCategoryExists(id))
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

        // POST: api/VocabularyCategories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<VocabularyCategoryBase>> PostVocabularyCategory([FromForm] VocabularyCategory vocabularyCategory)
        {
            if (ModelState.IsValid)
            {
                vocabularyCategory.Id = Guid.NewGuid();
                string filename = await _ManagerImages.SaveImageAsync(
                    vocabularyCategory.Image,
                    Helper.PathImageCategory,
                    vocabularyCategory.Id.ToString()
                    );
                if (!string.IsNullOrEmpty(filename))
                {
                    vocabularyCategory.ImageUrl = filename;
                    var user = await _UserManager.GetUserAsync(HttpContext.User);

                    if (user == null)
                    {
                        return BadRequest("Not found user!");
                    }

                    vocabularyCategory.UserId = user.Id;

                    vocabularyCategory = _context.VocabularyCategories.Add(vocabularyCategory).Entity;
                    await _context.SaveChangesAsync();
                    vocabularyCategory.Image = null;
                    return vocabularyCategory;
                }

            }

            return BadRequest(ModelState);

        }

        // DELETE: api/VocabularyCategories/5
        [HttpDelete]
        public async Task<ActionResult<VocabularyCategoryBase>> DeleteVocabularyCategory([FromQuery] Guid id)
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
