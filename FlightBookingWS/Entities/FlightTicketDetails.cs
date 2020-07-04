using System;
using System.Collections.Generic;

namespace FlightDup.Entities
{
    public partial class FlightTicketDetails
    {
        public string TicketNumber { get; set; }
        public string Username { get; set; }
        public string PassengerName { get; set; }
        public string FlightNumber { get; set; }
        public string FlightSource { get; set; }
        public string FlightDestination { get; set; }
        public string TravelDate { get; set; }
        public string FlightClassType { get; set; }
    }
}
