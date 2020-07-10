using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightDup.Models
{
    public class SaveBookFlightDetailModel
    {
        public string Username { get; set; }
        public string PassengerName { get; set; }
        public string ClassType { get; set; }
        public string FlightNumber { get; set; }
        public string FlightSource { get; set; }
        public string FlightDestination { get; set; }
        public string TravelDate { get; set; }
    }
}
