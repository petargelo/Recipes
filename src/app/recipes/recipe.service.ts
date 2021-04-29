import { Injectable } from "@angular/core";
import { EventEmitter } from "events";
import {Recipe} from './recipe.model';

export class RecipeService{
    recipeSelected=new EventEmitter<Recipe>();
    
   private recipes: Recipe[] = [
        new Recipe('Wok', 'This is simply a Wok test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
        new Recipe('Tortilla', 'This is simply a Tortilla test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
    ];

    getRecipes(){
        return this.recipes.slice(); //slice vraća shallow copy recipes array-a umjesto da se koristi direktna referenca.. Ne mijenja recipes nego uzima podatke od njega i kreira novi array. Promjene u recipe će se updateati i u novu kopiju. Ovo se radi da se onemogući pristup izvana na recipes!? 
    }

    }
    
   