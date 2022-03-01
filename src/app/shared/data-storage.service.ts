import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";


@Injectable({providedIn:'root'}) 
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){}

        storeRecipes(){
            const recipes= this.recipeService.getRecipes(); //using recipeService method to store
            this.http.put( // .put overwrites existing data with new data 
                'https://recipebookngapp-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', // auth interceptor is added to this http request 
                recipes).subscribe(response=>{
                    console.log(response);
                }); //another way is to add return in front of put request and subscribe in header component. 
                    //Useful if loading spinner should be shown because header component then knows if request is done or not. 

        }

        /* fetchRecipes(){
            return this.http.get<Recipe[]>( //return because I'm not subscribing here at the end anymore, but in header component
                'https://recipebookngapp-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
                .pipe(
                    map(recipes=>{
                        return recipes.map(recipe=>{
                         return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}; //copy all recipes but change ingredients. If ingredients true (has 0 or more elements) write them, else write empty array. 
                    }) 
                }),
                tap(recipes=> {
                    this.recipeService.setRecipes(recipes);
                }))
                /* .subscribe(recipes=>{
                    this.recipeService.setRecipes(recipes);  }*/
        
                                    //TypeScript doesn't understand recipes is really array. It sees it as body of http response.
                                                            //I inform TS about type with adding type format -> <Recipe[]> */
  
        fetchRecipes(){
                return this.http.get<Recipe[]>( 'https://recipebookngapp-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?', // auth interceptor is added to this http request 
                )
                .pipe(
                    map(recipes=>{
                        return recipes.map(recipe=>{
                            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    });
                }),
                tap (recipes=>{
                    this.recipeService.setRecipes(recipes);
                })
            );
            
            
    
}
    
}
