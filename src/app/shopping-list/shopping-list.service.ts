import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  startedEditing = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getSpecificIngredient(index:number){
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());  //ingredientsChanged is called everytime I expect some change to happen. It serves for an observable.
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }


  addIngredients(ingredientz: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }

    console.log(ingredientz);
   

    
    this.ingredients.push(...ingredientz); //'...' ili 'spread operator' je ES6 (Ecma Script standard 6 generacije) feature koji array elemenata pretvara u listu elemenata
                                          //https://livecodestream.dev/post/how-to-use-the-spread-operator-in-javascript/

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
