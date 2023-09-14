import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { StoreService } from 'src/app/core/services/store.service';
import { User } from 'src/app/shared/interfaces/user';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'fb-profile',
  standalone: true,
  imports: [CommonModule, FormModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ApiService, StoreService]
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user!: User;
  public isMobile: boolean;
  public isEdit: boolean = false;
  private unsubscriber: Subject<void> = new Subject();

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.storeService.loggedUser$.pipe(takeUntil(this.unsubscriber)).subscribe((user: User | null) => this.user = user as User);
    this.isMobile = this.deviceDetectorService.isMobile();
  }

  public ngOnInit(): void {
    /** ASSERTION:
     *  we assume that the user-information in the store.service are incomplete, so that we
     *  would need to fetch more user data with the findUser method (data will be the same due to the mocked service)
     * */
    this.apiService.findUser(this.user.id!).subscribe((response: User) => this.user = response);

  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
