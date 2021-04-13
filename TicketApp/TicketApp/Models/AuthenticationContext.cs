using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketApp.Models
{
    public class AuthenticationContext : DbContext
    {
        public AuthenticationContext(DbContextOptions<AuthenticationContext> options): base(options)
        {

        }

        public DbSet<AuthenticationDetail> AuthenticationDetails { get; set; }
        public DbSet<TicketDetail> TicketDetails { get; set; }
    }
}

