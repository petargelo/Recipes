import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
    ],

    imports:[
        FormsModule, // enables template driven forms which are used in shopping list area
        CommonModule,
        RouterModule.forChild([{path:'', component: ShoppingListComponent }]) //path is now set in app-routing for lazy loading
    ]
})

export class ShoppingListModule{

}   