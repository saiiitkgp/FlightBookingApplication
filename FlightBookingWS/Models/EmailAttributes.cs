using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightDup.Models
{
    public class EmailAttributes
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public string FromAddress { get; set; }
        public string ToAddress { get; set; }
        public string CcAddress { get; set; }
        public string BccAddress { get; set; }
    }
}
