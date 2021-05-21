using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketApp.Models;

namespace TicketApp.Services
{
    interface ITicketInfoRepository
    {
        IEnumerable<TicketDetail> GetTickets();

        TicketDetail GetTicket(int ticketId);

        bool TicketExists(int ticketId);

        void UpdateTicket(int ticketId, TicketDetail ticket);

        void DeleteTicket(TicketDetail ticket);

        bool Save();
    }
}
