import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {PrivacyComponent} from "./privacy/privacy.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent, title: 'ITStorm | Авторизация'},
  {path: 'signup', component: SignupComponent, title: 'ITStorm | Регистарция'},
  {path: 'privacy', component: PrivacyComponent, title: 'ITStorm | Политика конфиденциальности'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
