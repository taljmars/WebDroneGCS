import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { InputsModule, IconsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginPageComponentDesktop } from './login-page.component.desktop';
import { LoginPageComponentMobile } from './login-page.component.mobile';


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
  declarations: [
    LoginPageComponentDesktop, 
    LoginPageComponentMobile
  ],
  exports: [
    LoginPageComponentDesktop, 
    LoginPageComponentMobile
  ]
})
export class LoginPageModule { }
