import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { InputsModule, IconsModule, MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MDBBootstrapModule.forRoot(),
    IconsModule,
  ],
  declarations: [LoginPageComponent],
  exports: [
    
    LoginPageComponent
  ]
})
export class LoginPageModule { }
