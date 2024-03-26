import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/services/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'signin' , pathMatch:'full'},
  {path:'signin', component:SigninComponent , title:'signin'},
  {path:'signup', component:SignupComponent , title:'signup'},
  {path:'notes', canActivate:[authGuard], component:NotesComponent, title:'Notes'},
  {path:'**' , component:NotfoundComponent, title:'Page Notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
