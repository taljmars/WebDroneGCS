
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import {FormsModule} from '@angular/forms';

import { MDBBootstrapModule, ModalModule, TooltipModule, PopoverModule } from 'angular-bootstrap-md';

import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppToolbarMobile } from './app.toolbar.mobile';
import { AppToolbarDesktop } from './app.toolbar.desktop';

import { MatDialogModule } from '@angular/material';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { AppRoutingModule } from '../app-routing.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppToolbarDesktop,
    AppToolbarMobile,
    // CanActivateRouteGuard,
  ],
  imports: [
    MatDividerModule,
    MatIconModule,

    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,

    MDBBootstrapModule.forRoot(),

    AppRoutingModule, 
    FormsModule,
    BrowserModule,
    HttpClientModule,

    MatDialogModule,
    MatToolbarModule,
    
    ModalModule, TooltipModule, PopoverModule, 
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    AppToolbarDesktop,
    AppToolbarMobile
  ],
  providers: [],
  bootstrap: [AppToolbarDesktop, AppToolbarMobile]
})
export class AppToolbarModule { }
