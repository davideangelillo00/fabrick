import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/core-guards';
import { RoutesEnum } from './core/enums/routes.enum';

const routes: Routes = [
  {
    path: RoutesEnum.HOME,
    pathMatch: 'full',
    loadComponent: () => import('./features/home/components/home/home.component').then(comp => comp.HomeComponent)
  },
  {
    path: RoutesEnum.REGISTER,
    loadComponent: () => import('./features/register-user/components/register-user/register-user.component').then(comp => comp.RegisterUserComponent),
  },
  {
    path: RoutesEnum.PROFILE,
    loadComponent: () => import('./features/profile/components/profile/profile.component').then(comp => comp.ProfileComponent),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
