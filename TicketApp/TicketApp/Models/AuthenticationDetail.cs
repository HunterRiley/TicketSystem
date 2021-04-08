using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicketApp.Models
{
    public class AuthenticationDetail
    {
        [Key]
        public int UserId { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Username { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string Type { get; set; }
    }
}
