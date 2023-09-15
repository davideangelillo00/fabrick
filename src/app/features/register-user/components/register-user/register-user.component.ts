import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterForm } from '../../interfaces/register-form';
import { Select } from 'src/app/shared/interfaces/select';
import { User } from 'src/app/shared/interfaces/user';
import { emailValidator, fullNameValidator, getGenders } from 'src/app/core/utils/common-functions';
import { ApiService } from 'src/app/core/services/api.service';
import { StoreService } from 'src/app/core/services/store.service';
import { RegistrationErrorsEnum } from '../../enums/registration-errors.enum';
import { Router } from '@angular/router';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { UserStatusEnum } from 'src/app/shared/enums/user.enum';
import { RoutesEnum } from 'src/app/core/enums/routes.enum';
import { ValidationErrorsEnum } from 'src/app/core/enums/validator-errors.enum';

@Component({
  selector: 'fb-register-user',
  standalone: true,
  imports: [CommonModule, FormModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  public form: FormGroup<RegisterForm>;
  public genders: Select[] = getGenders();

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private router: Router,
    private modalsService: ModalsService
  ) {
    this.form = this.initForm();
  }

  public getErrorLabel(control: keyof RegisterForm): string | null {
    let error: string | null = null;
    switch (control) {
      case 'name':
        error = this.form?.controls.name.errors?.[ValidationErrorsEnum.FULL_NAME] ? RegistrationErrorsEnum.INVALID_FULL_NAME : null;
        break;
      case 'email':
        error = this.form?.controls.email.errors?.[ValidationErrorsEnum.EMAIL] ? RegistrationErrorsEnum.INVALID_EMAIL : null;
        break;
    }
    return error;
  }

  public register(): void {
    this.apiService.registerUser({
      ...this.form.value,
      status: UserStatusEnum.ACTIVE,
    } as Omit<User, 'id'>).subscribe((response: User) => {
        this.storeService.setLoggedUser(response);
        this.modalsService.openModal(ModalComponent, {
          title: 'Registration success!',
          text: 'You will now be redirected',
          buttonText: 'Ok',
          callback: () => { this.router.navigate([RoutesEnum.HOME]); }
        });
    });
  }

  private initForm(): FormGroup<RegisterForm> {
    return new FormGroup<RegisterForm>({
      name: new FormControl('', {validators: [Validators.required, fullNameValidator], nonNullable: true}),
      email: new FormControl('', {validators: [Validators.required, emailValidator], nonNullable: true}),
      gender: new FormControl(this.genders[0].value, {validators: [Validators.required]}),
    });
  }
}
