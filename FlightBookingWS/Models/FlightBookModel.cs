using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightDup.Models
{
    public class FlightBookModel
    {
        public string FlightSource { get; set; }
        public string FlightDestination { get; set; }
        public int? FlightCost { get; set; }
        public string TicketDetails { get; set; }
    }
}
