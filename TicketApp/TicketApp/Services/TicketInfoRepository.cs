using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketApp.Models;

namespace TicketApp.Services
{
    public class TicketInfoRepository
    {
        private readonly AuthenticationContext _context;

        public TicketInfoRepository(AuthenticationContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IEnumerable<TicketDetail> GetTickets()
        {
            return _context.TicketDetails.OrderBy(c => c.TicketDetailId).ToList();
        }

        public TicketDetail GetTicket(int ticketId)
        {
            return _context.TicketDetails.Where(t => t.TicketDetailId == ticketId).FirstOrDefault();
        }

        public bool TicketExists(int ticketId)
        {
            return _context.TicketDetails.Any(t => t.TicketDetailId == ticketId);
        }

        //public void AddTicket(int ticketId)
        //{
        //    var ticket = GetTicket(ticketId);
        //    ticket.TicketDetailId.Add();
        //}

        public void UpdateTicket(int ticketId, TicketDetail ticket)
        {

        }

        public void DeleteTicket(TicketDetail ticket)
        {
            _context.TicketDetails.Remove(ticket);
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
