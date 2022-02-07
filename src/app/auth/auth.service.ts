import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;	    /* A Firebase Auth ID token for the newly created user. */
    email: string;	        /* The email for the newly created user. */
    refreshToken: string;	/* A Firebase Auth refresh token for the newly created user. */
    expiresIn: string;	    /* The number of seconds in which the ID token expires. */
    localId: string;          /* The uid of the newly created user. */
    registered?: boolean;   // FOR SIGNIN METHOD, Whether the email is for an existing account. 

}

@Injectable({providedIn:'root'}) //when providedIn is added there is no need to add service to providers array in app.module

export class AuthService{

constructor (private authService: HttpClient, private router: Router){  }

    user = new BehaviorSubject<User>(null);
    token: string = null;
    private tokenExpirationTimer: any;

    signup(email: string, password: string){
        return this.authService.post<AuthResponseData> ( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcV0QVbhFeYSbcK57wy3z6ov-e4hkiOUw',
        {   email: email,
            password: password,
            returnSecureToken: true } 
        )
        .pipe(catchError(this.handleError), 
        tap(resData=>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn) // + added for converting from Date object format to number; tap operator allows to perform some action without changing the response
        }));          
        // this is a Firebase POST API, key is taken from Project Setting in Firebase Console

    }

    login(email:string, password:string){
    return this.authService.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcV0QVbhFeYSbcK57wy3z6ov-e4hkiOUw',
    {email:email,
        password: password,
        returnSecureToken: true}
    )
    .pipe(catchError(this.handleError),
    tap(resData=>{
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn) // + added for converting from Date object format to number
    }));
    }

    logout(){
        this.user.next(null); // user is set to default and not authenticated anymore
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    private handleAuthentication(email:string, userId: string, token: string, expiresIn: number){ //user is created here
        const expirationDate = new Date(new Date().getTime() + expiresIn*1000); //there are 2 newDate function to force variable to be of date type. The second one gets converted to number, the first forces it to get back Date type
        const userz= new User(email, userId, token, expirationDate);
        
        this.user.next(userz);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(userz)); //JS object must be converted to string to write to localStorage
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        }, expirationDuration);
    }

    autoRelogin(){
       const userData: {email: string, id: string; _token: string, _tokenExpirationDate: Date}= JSON.parse(localStorage.getItem('userData')); //convert from JSON.string to JS object
       if (!userData) {
           return; 
       }
       
       const loadedUser= new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate);

       if(loadedUser.token){ //if getter from user.model is true, i.e. not null
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
       } 
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occured!'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        } // If request doesn't return error message with error or error.error key because of some network problem, display Unkonwn error!

        switch(errorRes.error.error.message){
         case 'EMAIL_EXISTS': 
         errorMessage = 'This email is already in use';
         break;
         case 'OPERATION_NOT_ALLOWED':
         errorMessage = 'Password sign-in is disabled for this project.';
         break;
         case 'TOO_MANY_ATTEMPTS_TRY_LATER': 
         errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
         break;
         case 'EMAIL_NOT_FOUND':
         errorMessage= 'There is no user record corresponding to this identifier. The user may have been deleted.'
         break;
         case 'INVALID_PASSWORD':
         errorMessage='The password is invalid or the user does not have a password.'
         break;
         case 'USER_DISABLED':
         errorMessage='The user account has been disabled by an administrator.'
         break;
        }
    return throwError(errorMessage);
    }
    
}
