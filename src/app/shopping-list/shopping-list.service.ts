import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredientz: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }

    console.log(ingredientz);
   

    
    this.ingredients.push(...ingredientz); //'...' ili 'spread operator' je ES6 (Ecma Script standard 6 generacije) feature koji array elemenata pretvara u listu elemenata
                                          //https://livecodestream.dev/post/how-to-use-the-spread-operator-in-javascript/

    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
