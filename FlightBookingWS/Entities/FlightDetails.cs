using System;
using System.Collections.Generic;

namespace FlightDup.Entities
{
    public partial class FlightDetails
    {
        public string FlightNumber { get; set; }
        public string FlightSource { get; set; }
        public string FlightDestination { get; set; }
        public int? NoOfEconomySeats { get; set; }
        public int? NoOfBusinessSeats { get; set; }
        public int? FlightAvailabilityId { get; set; }
        public decimal? FlightCostEconomy { get; set; }
        public decimal? FlightCostBusiness { get; set; }

        public virtual FlightAvailabilityDates FlightAvailability { get; set; }
    }
}
