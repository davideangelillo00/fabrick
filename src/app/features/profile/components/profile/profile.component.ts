import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { StoreService } from 'src/app/core/services/store.service';
import { User } from 'src/app/shared/interfaces/user';
import { DeviceDetectorService } from 'ngx-device-detector';
import { RegistrationErrorsEnum } from 'src/app/features/register-user/enums/registration-errors.enum';
import { RegisterForm } from 'src/app/features/register-user/interfaces/register-form';
import { emailValidator, fullNameValidator, getGenders } from 'src/app/core/utils/common-functions';
import { Select } from 'src/app/shared/interfaces/select';
import { UserStatusEnum } from 'src/app/shared/enums/user.enum';

@Component({
  selector: 'fb-profile',
  standalone: true,
  imports: [CommonModule, FormModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ApiService]
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user!: User;
  public isMobile: boolean;
  public isEdit: boolean = false;
  public form: FormGroup<RegisterForm>;
  public genders: Select[] = getGenders();
  private unsubscriber: Subject<void> = new Subject();

  public get fullNameErrorLabel(): string | null {
    return this.form?.controls.name.errors?.['fullNameValidation'] ? RegistrationErrorsEnum.INVALID_FULL_NAME : null;
  }

  public get emailErrorLabel(): string | null {
    return this.form?.controls.email.errors?.['emailValidation'] ? RegistrationErrorsEnum.INVALID_EMAIL : null;
  }

  public get isDisabledProfile(): boolean {
    return this.user?.status === UserStatusEnum.INACTIVE;
  }

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.form = this.initForm();
    this.storeService.loggedUser$.pipe(takeUntil(this.unsubscriber)).subscribe((user: User | null) => {
      this.user = user as User;
      this.form.patchValue(this.user);
    });
    this.isMobile = this.deviceDetectorService.isMobile();
  }

  public ngOnInit(): void {
    /** ASSERTION:
     *  we assume that the user-information in the store.service are incomplete, so that we
     *  would need to fetch more user data with the findUser method (data will be the same due to the mocked service)
     */
    this.retrieveUserData();
  }

  public ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  public toggleEdit(): void {
    this.form.patchValue(this.user);
    this.isEdit = !this.isEdit;
  }

  public updateUser(): void {
    this.apiService.updateUser({id: this.user.id, ...this.form.value} as Partial<User>).subscribe((response: User) => {
      this.storeService.setLoggedUser(response);
      this.isEdit = false;
    });
  }

  public toggleProfileEnabled(): void {
    this.apiService.updateUser({
      id: this.user.id,
      status: this.user.status === UserStatusEnum.ACTIVE
        ? UserStatusEnum.INACTIVE
        : UserStatusEnum.ACTIVE
    }).subscribe((user: User) => this.storeService.setLoggedUser(user));
  }

  private retrieveUserData(): void {
    this.apiService.findUser(this.user.id!).subscribe((response: User) => {
      this.user = response;
      this.form.patchValue(this.user);
    });
  }

  private initForm(): FormGroup<RegisterForm> {
    return new FormGroup<RegisterForm>({
      name: new FormControl('', {validators: [Validators.required, fullNameValidator], nonNullable: true}),
      email: new FormControl('', {validators: [Validators.required, emailValidator], nonNullable: true}),
      gender: new FormControl(this.genders[0].value, {validators: [Validators.required]}),
    })
  }
}
