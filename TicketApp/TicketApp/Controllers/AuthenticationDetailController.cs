using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketApp.Models;

namespace TicketApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationDetailController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public AuthenticationDetailController(AuthenticationContext context)
        {
            _context = context;
        }

        // GET: api/AuthenticationDetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuthenticationDetail>>> GetAuthenticationDetails()
        {
            return await _context.AuthenticationDetails.ToListAsync();
        }

        // GET: api/AuthenticationDetail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AuthenticationDetail>> GetAuthenticationDetail(int id)
        {
            var authenticationDetail = await _context.AuthenticationDetails.FindAsync(id);

            if (authenticationDetail == null)
            {
                return NotFound();
            }

            return authenticationDetail;
        }

        // PUT: api/AuthenticationDetail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuthenticationDetail(int id, AuthenticationDetail authenticationDetail)
        {
            if (id != authenticationDetail.UserId)
            {
                return BadRequest();
            }

            _context.Entry(authenticationDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthenticationDetailExists(id))
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

        // POST: api/AuthenticationDetail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AuthenticationDetail>> PostAuthenticationDetail(AuthenticationDetail authenticationDetail)
        {
            _context.AuthenticationDetails.Add(authenticationDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuthenticationDetail", new { id = authenticationDetail.UserId }, authenticationDetail);
        }

        // DELETE: api/AuthenticationDetail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthenticationDetail(int id)
        {
            var authenticationDetail = await _context.AuthenticationDetails.FindAsync(id);
            if (authenticationDetail == null)
            {
                return NotFound();
            }

            _context.AuthenticationDetails.Remove(authenticationDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AuthenticationDetailExists(int id)
        {
            return _context.AuthenticationDetails.Any(e => e.UserId == id);
        }
    }
}
