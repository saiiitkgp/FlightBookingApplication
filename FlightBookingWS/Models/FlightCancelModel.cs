using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightDup.Models
{
    public class FlightCancelModel
    {
        public bool IsFlightCancelled { get; set; }
        public string ResponseMessage { get; set; }
    }
}
