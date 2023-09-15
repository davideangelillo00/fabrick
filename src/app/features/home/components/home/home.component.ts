import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { StoreService } from 'src/app/core/services/store.service';
import { RoutesEnum } from 'src/app/core/enums/routes.enum';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'fb-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DeviceDetectorService],
})
export class HomeComponent {
  public isMobile: boolean;
  public routes = RoutesEnum;
  public user!: User | null;

  public get userName(): string {
    return this.user?.name ?? '';
  }

  constructor(
    public storeService: StoreService,
    private deviceDetectorService: DeviceDetectorService,
    private router: Router
  ) {
    this.isMobile = this.deviceDetectorService.isMobile();
    this.storeService.loggedUser$.subscribe((user: User | null) => this.user = user);
  }

  public logout(): void {
    this.storeService.setLoggedUser(null);
    this.router.navigate([RoutesEnum.HOME]);
  }
}
