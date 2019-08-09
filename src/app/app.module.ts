import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgSelect2Module } from 'ng-select2';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { AccountsComponent } from './accounts/accounts.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgSelect2Module,
    RouterModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatExpansionModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,

    // StarRatingModule.forRoot(),
    RouterModule.forRoot([{
      path:'accounts',
      component: AccountsComponent
    },{
      path: 'home',
      component:HomeComponent
    }])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
