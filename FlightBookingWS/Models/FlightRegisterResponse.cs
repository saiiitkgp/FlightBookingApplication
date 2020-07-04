using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightDup.Models
{
    public class FlightRegisterResponse
    {
        public bool IsUserRegistered { get; set; }

        public string ReponseMessage { get; set; }

        public bool IsUserAlreadyExists { get; set; }
    }
}
