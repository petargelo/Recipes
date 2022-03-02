import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
declarations:[
    AuthComponent,
    
],

imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([{ path:'', component: AuthComponent }]) //path is now set in app-routing for lazy loading
]
})

export class AuthModule{}