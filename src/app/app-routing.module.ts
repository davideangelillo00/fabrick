import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/components/home/home.component').then(comp => comp.HomeComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register-user/components/register-user/register-user.component').then(comp => comp.RegisterUserComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
