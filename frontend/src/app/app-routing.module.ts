import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { GoalsComponent } from './pages/goals/goals.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {path: 'main', component: MainPageComponent},

  {path: 'signup/:token', component: SignUpPageComponent, children: [
    {path: 'personal', component: PersonalComponent},
    {path: 'goals', component: GoalsComponent}
  ]},
  {path: 'signin', component: SignInPageComponent},
  {path: 'home', component: HomePageComponent}, // TODO: Apply route guards to this route..
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
