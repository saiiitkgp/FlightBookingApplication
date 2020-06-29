using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightDup.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlightDup.Controllers
{
    [Route("api/flight")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private FlightDBContext flightDBContext = new FlightDBContext();

        [Route("ValidateUser")]
        [HttpGet]
        public async Task<IActionResult> ValidateUser(string userName,
           string passWord)
        {
            try
            {
                var IsValidUser = flightDBContext.FlightUsers.
                                  Where(x => x.Username == userName && x.Password == passWord)
                                  .Any();
                if (IsValidUser)
                {
                    return Ok("Logged In User Is Valid");
                }
                else
                {
                    return BadRequest("Invalid User");
                }
            }
            catch (Exception e)
            {
                return BadRequest("Invalid Request");
            }
        }

        [Route("RegisterUser")]
        [HttpPost]
        public async Task<IActionResult> RegisterUser(RegisterUserModel registerUserModel)
        {
            try
            {
                FlightUsers flightUsers = new FlightUsers();
                flightUsers.Username = registerUserModel.Username;
                flightUsers.Password = registerUserModel.Password;
                flightUsers.Email = registerUserModel.Email;
                flightUsers.PhoneNumber = registerUserModel.PhoneNumber;

                flightDBContext.FlightUsers.Add(flightUsers);
                flightDBContext.SaveChanges();
                return Ok("User Registered Successfully");
            }
            catch (Exception e)
            {
                return BadRequest("Invalid Request");
            }
        }


        [Route("BookFlight")]
        [HttpPost]
        public async Task<IActionResult> BookFlight(FlightBookModel flightBookModel)
        {
            try
            {
                FlightDetails flightDetails = new FlightDetails();
                flightDetails.FlightSource = flightBookModel.FlightSource;
                flightDetails.FlightDestination = flightBookModel.FlightDestination;
                flightDetails.FlightCost = flightBookModel.FlightCost;
                flightDetails.TicketDetails = flightBookModel.TicketDetails;

                flightDBContext.FlightDetails.Add(flightDetails);
                flightDBContext.SaveChanges();
                return Ok("Flight Booked Successfully");
            }
            catch (Exception e)
            {
                return BadRequest("Invalid Request" + e.StackTrace + e.Message);
            }
        }

        [Route("MyBookings")]
        [HttpPost]
        public async Task<IActionResult> MyBookings([FromBody]int flightNumber)
        {
            try
            {
                var flightDetails = flightDBContext.FlightDetails
                                                     .Where(x => x.FlightNumber == flightNumber)
                                                     .Select(x => x).FirstOrDefault();

                return Ok(flightDetails);
            }
            catch (Exception e)
            {
                return BadRequest("Invalid Request");
            }
        }
    }
}