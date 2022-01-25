import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';

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
  error: string = null;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm)  {
    const email=form.value.email;
    const password=form.value.password;
    let authObs: Observable<AuthResponseData>;

    if (!form.valid) {
      return;
    }

    this.isLoading=true;

    if(this.isLoginMode=true){
      authObs= this.authService.login(email,password);
    }
    else{
      authObs= this.authService.signup(email,password);
    }

    authObs.subscribe(
      resData=>{
        console.log(resData);
        this.isLoading=false;
      },errorMessage=>{
        console.log(errorMessage);
        this.error=errorMessage;
        this.isLoading=false;
      }
    )
      
    form.reset();
    }
    
}

