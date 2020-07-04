using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace FlightDup.Models
{
    public class ChangePasswordModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
