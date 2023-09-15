import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';
import { RoutesEnum } from '../../enums/routes.enum';

@Component({
  selector: 'fb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isMobile: boolean;
  public routes = RoutesEnum;

  constructor(
    public storeService: StoreService,
    private deviceDetectorService: DeviceDetectorService,
    private router: Router
  ) {
    this.isMobile = this.deviceDetectorService.isMobile();
  }

  public logout(): void {
    this.storeService.setLoggedUser(null);
    this.router.navigate([RoutesEnum.HOME]);
  }
}
