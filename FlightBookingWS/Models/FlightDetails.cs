using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlightDup.Models
{
    [Table("FlightDetails")]
    public partial class FlightDetails
    {
        public int FlightNumber { get; set; }
        public string FlightSource { get; set; }
        public string FlightDestination { get; set; }
        public int? FlightCost { get; set; }
        public string TicketDetails { get; set; }
    }
}
