using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightDup.Models
{
    public class ForgotPasswordModel
    {
        public string Username { get; set; }

        public string DateOfBirth { get; set; }
    }
}
