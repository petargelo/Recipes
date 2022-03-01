//this module holds everything that is related to recipes. This module is then imported to main Ngmodule - app.module

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DropdownDirective } from "../shared/dropdown.directive";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations:[ 
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        DropdownDirective
        
    ],

    imports:[
        RouterModule,
        RecipesRoutingModule, //added so recipe routes can be browsed.
        CommonModule,   //added so ngIf, ngFor can be used. Added instead of browser module which does this work in app module.
        ReactiveFormsModule,
    ],

    providers:[]

})

export class RecipesModule{}