﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketApp.Models;
using TicketApp.Services;

namespace TicketApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketDetailController : ControllerBase
    {
        //private readonly TicketInfoRepository _context;
        private readonly TicketInfoRepository _ticketInfoRepo;

        public TicketDetailController(TicketInfoRepository ticketInfoRepo)
        {
            //_context = context;
            _ticketInfoRepo = ticketInfoRepo ??
                throw new ArgumentNullException(nameof(ticketInfoRepo));

        }

        // GET: api/TicketDetail
        [HttpGet]
        public Task<ActionResult<IEnumerable<TicketDetail>>> GetTicketDetails()
        {
            var tickets = _ticketInfoRepo.GetTickets();
            return (Task<ActionResult<IEnumerable<TicketDetail>>>)tickets;
        }

        // GET: api/TicketDetail/5
        [HttpGet("{id}")]
        public Task<ActionResult<TicketDetail>> GetTicketDetail(int id)
        {
            var ticketDetail = _ticketInfoRepo.GetTicket(id);

            if (ticketDetail == null)
            {
                return NotFound();
            }

            return ticketDetail;
        }

        // PUT: api/TicketDetail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicketDetail(int id, TicketDetail ticketDetail)
        {
            if (id != ticketDetail.TicketDetailId)
            {
                return BadRequest();
            }

            _context.Entry(ticketDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketDetailExists(id))
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

        // POST: api/TicketDetail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TicketDetail>> PostTicketDetail(TicketDetail ticketDetail)
        {
            _context.TicketDetails.Add(ticketDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicketDetail", new { id = ticketDetail.TicketDetailId }, ticketDetail);
        }

        // DELETE: api/TicketDetail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicketDetail(int id)
        {
            var ticketDetail = await _context.TicketDetails.FindAsync(id);
            if (ticketDetail == null)
            {
                return NotFound();
            }

            _context.TicketDetails.Remove(ticketDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketDetailExists(int id)
        {
            return _context.TicketDetails.Any(e => e.TicketDetailId == id);
        }
    }
}
