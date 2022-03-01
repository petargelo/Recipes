import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode=undefined;
  recipeForm: FormGroup;
  get ingredientsControls(){
    return (this.recipeForm.get('ingredients') as FormArray).controls
  } //A getter property is like a function which you can use like a property in a template. You can't set a value to it, though, you can only read it. 
    //this expression here will resolve to a formArray, and therefore, it does not complain about using controls here as it had in template

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
    this.id=+params['id'];
    this.editMode = params['id'] != null; //if there is an id in params we are in edit mode
    console.log(this.editMode);
    this.initForm(); //calling initForm everytime something(routeparams) changes so values (name, imgPath, desc, ...) can be changed also
    }
    );
  }

  onSubmit(){
   /*  const newRecipe= new Recipe(
    this.recipeForm.value['name'],
    this.recipeForm.value['description'],
    this.recipeForm.value['imagePath'],
    this.recipeForm.value['ingredients']);  No need to save in const because recipeForm.value 
                                            already holds all values that are set here*/
    if (this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value/* newRecipe */);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value/* newRecipe */);
    }
    this.router.navigate(['../'], {relativeTo: this.route});  
    // calling onCancel() would have the same effect
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])        
      })
      );
  }

  onDeleteIngredient(index: number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route}); //route obj is in constructor and it represents ActivatedRoute
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription = '';
    let recipeIngredients= new FormArray([]);

    if (this.editMode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName= recipe.name;
      recipeImagePath= recipe.imagePath;
      recipeDescription= recipe.description;
      if (recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount,[
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required), 
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }
}
