import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
 

@Injectable({providedIn:'root'})

export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataService: DataStorageService, private recipesService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes=this.recipesService.getRecipes();
        if(recipes.length === 0){
        return this.dataService.fetchRecipes();}        //no need to subscribe here because resolver will subscribe instead of me

        else{
            return recipes;
        }
    }
    
}