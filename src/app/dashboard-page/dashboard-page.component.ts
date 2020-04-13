import {Component, NgModule, VERSION, OnInit} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory, 
        BingMapAPILoaderConfig, BingMapAPILoader, 
        GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class Dash {}
