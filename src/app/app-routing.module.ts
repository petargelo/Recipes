//1st step add NgModule to transform from regular TS class to Angular module and import RouterModule to it.. Set appRoutes to be used in forRoot
//register routes with const appRoutes=... =>it's actually list of JS objects
//create route that loads recipe section & shopping list section
//export RouterModule to make Router and routes accesible to appModule
//add to appModule imports AppRoutingModule. Now routing is added to application
//in app.comonent.html replace *ngIf's with <router-outlet>

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch:'full'}, //it's possible to just add recipes as 'component:' instead of redirectTo
    /* { path: 'shopping-list', component: ShoppingListComponent }, */
    /* { path:'auth', component: AuthComponent } */
    { path:'recipes', loadChildren: ()=> import('./recipes/recipes.module').then(m => m.RecipesModule) }, //this path is lazy loaded. Import resolves a promise so I'm calling 'then()'. m contains module object './recipes/recipes.module'
    { path:'shopping-list', loadChildren: ()=> import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)},
    { path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
}) 

export class AppRoutingModule{

}
