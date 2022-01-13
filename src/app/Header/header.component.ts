import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  
  constructor(private dataStorageService: DataStorageService){

  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();  //subscribing here but not caring about answer. Because I'm returning fetchRecipes not subscribing 
  }
}
