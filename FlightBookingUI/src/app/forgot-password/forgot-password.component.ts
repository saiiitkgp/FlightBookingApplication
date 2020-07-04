import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {NgForm} from '@angular/forms';
import { ForgotPasswordService } from '../forgot-password.service';
import {ChangePasswordService} from '../change-password.service';
import {Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userName = ''
  dateOfBirth;
  temporaryPassword = ''
  forgotPasswordData = ''
  newPassword = ''
  confirmNewPassword = ''
  changePasswordData = ''
  dupPassword = ''
  submitButton = ''

  constructor(private forgotPasswordService : ForgotPasswordService,private router:Router,
    private changePasswordService : ChangePasswordService) { }

  ngOnInit() {
    this.submitButton = 'Generate Temporary Password';
  }

  forgotPasswordSubmit(form: NgForm)
  {

    if(this.submitButton == 'Change Password')
    {
      this.changePasswordService.changePasswordData(this.userName, this.newPassword).
      subscribe((data) => {this.changePasswordData = data
      
        if(data.IsPasswordChanged)
        {
          this.router.navigate(['/login']);
        }
        else
        {
          this.router.navigate(['/forgotpassword']);
        }
      
      });
    }

    else
    {

    if(this.submitButton == 'Verify Password')
    {
      if(this.dupPassword == this.temporaryPassword.toString())
        {
        this.submitButton = 'Change Password';
        }
        else
        {
          console.log("Wrong Otp");
        }
    }
    else
    {
    this.forgotPasswordService.getForgotPasswordData(this.userName,this.dateOfBirth).
    subscribe((data) => {this.forgotPasswordData = data
      if(data.IsUserExists)
      { 
        this.submitButton = 'Verify Password';
        this.dupPassword = data.TemporaryPassword;
      }
      else
      {
        this.router.navigate(['/login']);
        form.reset();
      }
  });
  }
}
}
}
