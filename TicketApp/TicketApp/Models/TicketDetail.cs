using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicketApp.Models
{
    public class TicketDetail
    {
        [Key]
        public int TicketDetailId { get; set; }

        [Column(TypeName ="nvarchar(30)")]
        public string Severity { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Description { get; set; }

        // MM/DD/YYYY
        [Column(TypeName = "nvarchar(10)")]
        public string DateCreated { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string Status { get; set; }
    }
}
