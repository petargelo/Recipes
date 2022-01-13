//1st step add NgModule to transform from regular TS class to Angular module and import RouterModule to it.. Set appRoutes to be used in forRoot
//register routes with const appRoutes=... =>it's actually list of JS objects
//create route that loads recipe section & shopping list section
//export RouterModule to make Router and routes accesible to appModule
//add to appModule imports AppRoutingModule. Now routing is added to application
//in app.comonent.html replace *ngIf's with <router-outlet>

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipes-resolver.service";


const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch:'full'}, //it's possible to just add recipes as 'component:' instead of redirectTo
    { path: 'recipes', component: RecipesComponent, 
        children: [{path:'', component:RecipeStartComponent},
                    {path: 'new', component: RecipeEditComponent},
                    {path: ':id', component: RecipeDetailComponent,resolve:RecipeResolverService},
                    {path: ':id/edit', component: RecipeEditComponent, resolve:RecipeResolverService}
                ]},
    { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
}) 


export class AppRoutingModule{

}
