
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ApplicationStateService {

  private isMobileResolution: boolean = false;

  constructor() {
    // if (window.innerWidth < 768)
      this.isMobileResolution = true;
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }
}