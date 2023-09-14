import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { StoreService } from 'src/app/core/services/store.service';

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

  constructor(
    public storeService: StoreService,
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceDetectorService.isMobile();
  }

}
