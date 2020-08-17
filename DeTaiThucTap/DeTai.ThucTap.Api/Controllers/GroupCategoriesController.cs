using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeTai.ThucTap.Data;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DeTai.ThucTap.Api.Controllers
{
    public class GroupCategoriesController : ApiBaseController
    {
        private readonly ApplicationContext _context;
        public GroupCategoriesController(ApplicationContext context)
        {
            _context = context;
        }
        // GET: api/<GroupCategoriesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return null;
        }

        // GET api/<GroupCategoriesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<GroupCategoriesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<GroupCategoriesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<GroupCategoriesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
