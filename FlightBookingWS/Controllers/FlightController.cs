using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using FlightDup.Entities;
using FlightDup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FlightDup.Controllers
{
    [Route("api/flight")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private FlightDBContext flightDBContext = new FlightDBContext();

        public static readonly string NUMERIC_CHARACTERS = "0123456789";

        public static readonly int LengthOfPassword = 4;

        [Route("ValidateUser")]
        [HttpPost]
        public  async Task<IActionResult> ValidateUser([FromBody]Login login)
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

                var user = flightDBContext.FlightUsers.Where(x => x.Username ==
                registerUserModel.Username).Select(x => x).Any();

                if (!user)
                {
                    FlightUsers flightUsers = new FlightUsers();
                    flightUsers.Username = registerUserModel.Username;
                    flightUsers.Password = registerUserModel.Password;
                    flightUsers.Email = registerUserModel.Email;
                    flightUsers.PhoneNumber = registerUserModel.PhoneNumber;
                    flightUsers.DateOfBirth = registerUserModel.DateOfBirth;

                    flightDBContext.FlightUsers.Add(flightUsers);
                    flightDBContext.SaveChanges();
                    FlightRegisterResponse flightRegisterResponse = new FlightRegisterResponse();
                    flightRegisterResponse.IsUserRegistered = true;
                    flightRegisterResponse.ReponseMessage = "User Registered Successfully";
                    flightRegisterResponse.IsUserAlreadyExists = false;
                    return Ok(SerializeIntoJson(flightRegisterResponse));
                }
                else
                {
                    FlightRegisterResponse flightRegisterResponse = new FlightRegisterResponse();
                    flightRegisterResponse.IsUserRegistered = false;
                    flightRegisterResponse.ReponseMessage = "User Not Registered";
                    flightRegisterResponse.IsUserAlreadyExists = true;
                    return Ok(SerializeIntoJson(flightRegisterResponse));
                }
            }
            catch (Exception e)
            {
                return BadRequest("Invalid Request");
            }
        }

        [Route("GenerateTemporaryPassword")]
        [HttpPost]
        public async Task<IActionResult> GenerateTemporaryPassword(ForgotPasswordModel forgotPasswordModel)
        {
            string temporaryPassword = "";
            bool isEmailSent = false;
            ForgotPasswordResponse forgotPasswordResponse = null;
            try
            {

                var IsUserExists = flightDBContext.FlightUsers.
                                          Where(x => x.Email == forgotPasswordModel.Username
                                          && x.DateOfBirth == forgotPasswordModel.DateOfBirth)
                                          .Any();
               if(IsUserExists)
                {
                    temporaryPassword = GenerateTemporaryPassword();
                    string mailBodyContent = BuildMailContentBody(temporaryPassword);
                    List<MailMessage> mailMessages = 
                        GetMailMessage(forgotPasswordModel.Username, mailBodyContent);
                    isEmailSent = SendEmails(mailMessages);
                    
                }
                if (isEmailSent && IsUserExists)
                {
                    forgotPasswordResponse = new ForgotPasswordResponse();
                    forgotPasswordResponse.IsUserExists = IsUserExists;
                    forgotPasswordResponse.TemporaryPassword = temporaryPassword;
                    return Ok(SerializeIntoJson(forgotPasswordResponse));
                }
                else
                {
                    forgotPasswordResponse = new ForgotPasswordResponse();
                    forgotPasswordResponse.IsUserExists = IsUserExists;
                    forgotPasswordResponse.TemporaryPassword = "-1";
                    return Ok(SerializeIntoJson(forgotPasswordResponse));
                }
            }
            catch (Exception e)
            {
                return BadRequest("Invalid Request" + e.StackTrace + e.Message);
            }
        }

        [Route("ChangePassWord")]
        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel changePasswordModel)
        {
            try
            {

                FlightUsers flightUsers = flightDBContext.FlightUsers.
                                          Where(x => x.Email == changePasswordModel.UserName)
                                          .Select(x => x).FirstOrDefault();
                flightUsers.Password = changePasswordModel.Password;
                flightDBContext.SaveChanges();
                ChangePasswordResponse changePasswordResponse = 
                    new ChangePasswordResponse();
                changePasswordResponse.IsPasswordChanged = true;
                return Ok(SerializeIntoJson(changePasswordResponse));
            }
            catch (Exception e)
            {
                return BadRequest("Invalid Request" + e.StackTrace + e.Message);
            }
        }


        public string SerializeIntoJson<T>(T model)
        {
            return JsonConvert.SerializeObject(model);
        }


        public string GenerateTemporaryPassword()
        {
            List<string> numericCharacters = new List<string>();

            numericCharacters.Add(NUMERIC_CHARACTERS);

            int lengthOfPassword = LengthOfPassword;

            Random random = new Random();
            char[] password = new char[lengthOfPassword];

            for (int i = 0; i < lengthOfPassword; i++)
            {
              password[i] = numericCharacters[0][random.Next(numericCharacters[0].Length - 1)];
            }
            string temporaryPassword = new string(password);

            return temporaryPassword;
        }

        public string BuildMailContentBody<T>(T emailBodyModel)
        {
            if (typeof(T) == typeof(string))
            {
                return $"Dear User, Your Temporary Password is: {emailBodyModel}";
            }

            return string.Empty;
        }

        public List<MailMessage> GetMailMessage(string toEmailId, string bodyContent)
        {
            List<EmailAttributes> emailAttributesCollection = new List<EmailAttributes>()
            {
                new EmailAttributes()
                {
                    ToAddress = toEmailId,
                    Body = bodyContent,
                    Subject = "Temporary Passowrd"
                }
            };

            List<MailMessage> mailMessages = new List<MailMessage>();
            if (emailAttributesCollection != null)
            {
                foreach (EmailAttributes emailAttributes in emailAttributesCollection)
                {
                    MailMessage mailMessage = new MailMessage();

                    if (emailAttributes.ToAddress != null) mailMessage.To.
                            Add(new MailAddress(emailAttributes.ToAddress));
                    mailMessage.From = new MailAddress("manojpvs12@gmail.com");
                    mailMessage.Body = emailAttributes.Body;
                    mailMessage.Subject = emailAttributes.Subject;
                    mailMessage.IsBodyHtml = true;

                    mailMessages.Add(mailMessage);
                }
            }
            return mailMessages;
        }

        public bool SendEmails(List<MailMessage> mailMessages)
        {
            bool isEmailSent = false;

                using (SmtpClient smtpServer = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtpServer.EnableSsl = true;
                    smtpServer.Credentials = 
                    new NetworkCredential("manojpvs12@gmail.com", "Eiffeltower@1");
                  foreach (MailMessage mail in mailMessages)
                    {
                        try
                        {
                            smtpServer.Send(mail);
                            isEmailSent = true;
                        }
                        catch (Exception ex)
                        {
                            isEmailSent = false;
                        }
                    }
                }
            return isEmailSent;
        }
    }
}