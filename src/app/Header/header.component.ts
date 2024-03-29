import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  
  private userSub: Subscription;
  isAuthenticated= false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router){

  }

  ngOnInit(){
      this.userSub =this.authService.user.subscribe(user=>{
        this.isAuthenticated = !user ? false : true; // if there is no user object set isAuthenticated to false, else set to true
      });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onLogout(){
    this.authService.logout();
    
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();  //subscribing here but not caring about answer. Because I'm returning fetchRecipes not subscribing 
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
      
  }
}
