import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupSigninComponent } from './signup-signin/signup-signin.component';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { ShopComponent } from './shop/shop.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupSigninComponent,
    HomeComponent,
    AppointmentComponent,
    ProfileComponent,
    CategoriesComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
