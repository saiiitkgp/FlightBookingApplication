using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightDup.Models
{
    public class FetchFlightResponse
    {
        public string FlightNumber { get; set; }

        public List<FlightBusinessClassDetails>  BusinessClassDetails{ get; set;}
        public List<FlightEconomyClassDetails>  EconomyClassDetails{ get; set;}
    }
}
