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
  isLoading = false;
  signupError: string =null;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm)  {
    const email=form.value.email;
    const password=form.value.password;

    if (!form.valid) {
      return;
    }

    this.isLoading=true;

    if(this.isLoginMode){
      console.log("U Login modu ste");}

      else{
      this.authService.signup(email, password).subscribe(resData=> 
        {
        console.log(resData);
        this.isLoading=false;
        }, errorMessage=>
        {
          console.log(errorMessage);
          this.signupError=errorMessage;
          this.isLoading=false;
        }
        )
    }

    form.reset();
    }
    
}

