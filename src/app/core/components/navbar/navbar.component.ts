import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'fb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isMobile: boolean;
  constructor(
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceDetectorService.isMobile();
  }
}
