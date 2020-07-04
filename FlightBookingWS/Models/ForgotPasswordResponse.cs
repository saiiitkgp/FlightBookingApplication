using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightDup.Models
{
    public class ForgotPasswordResponse
    {
        public bool IsUserExists { get; set; }
        public string TemporaryPassword { get; set; }
    }
}
