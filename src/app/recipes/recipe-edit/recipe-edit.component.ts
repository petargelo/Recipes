import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
    this.id=+params['id'];
    this.editMode = params['id'] != null; //if there is an id in params we are in edit mode
    console.log(this.editMode);
    this.initForm(); //calling initForm everytime something(routeparams) changes 
    }
    );
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription = '';

    if (this.editMode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName= recipe.name;
      recipeImagePath= recipe.imagePath;
      recipeDescription= recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });
  }
}
