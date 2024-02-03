import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopComponent } from './shop/shop.component';
import { SignupSigninComponent } from './signup-signin/signup-signin.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:SignupSigninComponent},
  {path:'appointment',component:AppointmentComponent},
  {path:'profile',component:ProfileComponent},
  {path:'shop',component:ShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
