using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using FlightDup.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FlightDup.Controllers
{
    [Route("api/flight")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private FlightDBContext flightDBContext = new FlightDBContext();

        [Route("ValidateUser")]
        [HttpPost]
        public async Task<IActionResult> ValidateUser([FromBody]Login login)
        {
            try
            {
                FlightLoginModel flightLoginModel = new FlightLoginModel();
                var IsValidUser = flightDBContext.FlightUsers.
                                  Where(x => x.Username == login.userName && x.Password == login.passWord)
                                  .Any();
                if (IsValidUser)
                {
                    flightLoginModel.IsValidUser = IsValidUser;
                    flightLoginModel.ResponseMessage = "Logged In Successfully";
                }
                else
                {
                    flightLoginModel.IsValidUser = IsValidUser;
                    flightLoginModel.ResponseMessage = "Given Credentials Are Not Valid";
                }
                return Ok(SerializeIntoJson(flightLoginModel));
            }
            catch (Exception e)
            {
                return BadRequest("Invalid Request");
            }
        }

        [Route("RegisterUser")]
        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody]RegisterUserModel registerUserModel)
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
                FlightRegisterResponse flightRegisterResponse = new FlightRegisterResponse();
                flightRegisterResponse.IsUserRegistered = true;
                flightRegisterResponse.ReponseMessage = "User Registered Successfully";
                return Ok(SerializeIntoJson(flightRegisterResponse));
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

                return Ok(SerializeIntoJson(flightDetails));
            }
            catch (Exception e)
            {
                return BadRequest("Invalid Request");
            }
        }

        public string SerializeIntoJson<T>(T model)
        {
            return JsonConvert.SerializeObject(model);
        }
    }
}