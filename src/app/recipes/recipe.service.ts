import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>(); 

  private recipes: Recipe[] = [
    new Recipe(
      'Bečki odrezak',
      '"Wiener Schnitzel“, poznat je i omiljen u cijelom svijetu!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Teleći odrezak', 1),
        new Ingredient('Pomfrit', 20)
      ]),
    new Recipe('Veliki mesnati burger',
      'Treba li još išta dodati?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Pecivo', 2),
        new Ingredient('Teleći odrezak', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
  this.recipes.push(recipe);
  this.recipesChanged.next(this.recipes.slice()); //when new recipe is pushed emit new value, i.e. new copy of recipes
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());

  }
}
