import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'}) //this auth guard is technically a service
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{

        return this.authService.user.pipe(
            take(1),
            map(user=>{
            const isAuth = !!user; //if user doesn't exist, it returns true and another ! converts it to false
                                    // if user exists the final result is true. If all guards are true canActivate will allow navigation 
            if (isAuth){
                return true; //
            }
            return this.router.createUrlTree(['/auth']);
            }))

        //user Subject emits data more than once. Take is added to look in user value one time only, and unsubscribe until the guard is run again 
        // this guard is implemented in app-routing.module
    }
}