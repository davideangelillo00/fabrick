import { NgModule } from '@angular/core';
import { ApplicationConfig } from '@angular/platform-browser';
import { RouterModule, Routes, provideRouter } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then(comp => comp.HomeComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register-user/register-user.component').then(comp => comp.RegisterUserComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(comp => comp.LoginComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
