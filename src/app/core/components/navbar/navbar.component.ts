import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'fb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isMobile: boolean;

  constructor(
    public storeService: StoreService,
    private deviceDetectorService: DeviceDetectorService,
  ) {
    this.isMobile = this.deviceDetectorService.isMobile();
  }
}
