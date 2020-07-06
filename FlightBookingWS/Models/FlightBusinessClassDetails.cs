using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightDup.Models
{
    public class FlightBusinessClassDetails
    {
        public string ClassType { get; set; }
        public decimal? FlightCost { get; set; }
        public int? NoOfSeats { get; set; }
    }
}
