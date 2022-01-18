import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
/*   styleUrls: ['./auth.component.css'] */
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {  }

  isLoginMode = true;
  signupError= '';

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm)  {
    const email=form.value.email;
    const password=form.value.password;

    if (!form.valid) {
      return;
    }

    if(this.isLoginMode){
      console.log("U Login modu ste");}

      else{
      this.authService.signup(email, password).subscribe(resData=> 
        {
        console.log(resData);
        },
        error=>
        {
          this.signupError=error.error.error.message;
          /* this.signupError=error.error.error.message; */
        }
      );
    }

    form.reset();
    }
    
}

