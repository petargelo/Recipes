import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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

constructor (private authService: HttpClient){  }

signup(email: string, password: string){
    return this.authService.post<AuthResponseData> ( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcV0QVbhFeYSbcK57wy3z6ov-e4hkiOUw',
    {   email: email,
        password: password,
        returnSecureToken: true } 
       )
       .pipe(catchError(this.handleError));          
    // this is a Firebase POST API, key is taken from Project Setting in Firebase Console

}

login(email:string, password:string){
  return this.authService.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcV0QVbhFeYSbcK57wy3z6ov-e4hkiOUw',
   {email:email,
    password: password,
    returnSecureToken: true}
   )
   .pipe(catchError(this.handleError));
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
