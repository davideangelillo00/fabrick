import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterForm } from '../../interfaces/register-form';
import { Select } from 'src/app/shared/interfaces/select';
import { User, UserGender } from 'src/app/shared/interfaces/user';
import { emailValidator, fullNameValidator } from 'src/app/core/utils/common-functions';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'fb-register-user',
  standalone: true,
  imports: [CommonModule, FormModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  public form: FormGroup<RegisterForm>;
  public genders: Select[];

  constructor(
    private apiService: ApiService
  ) {
    this.form = this.initForm();
    this.genders = [
      {text: 'Male', value: 'male' as UserGender},
      {text: 'Female', value: 'female' as UserGender},
      {text: 'Other', value: 'other' as UserGender},
    ];
  }

  public register(): void {
    this.apiService.registerUser({
      ...this.form.value,
      status: 'active',
    } as Omit<User, 'id'>).subscribe({
      next: (response: User) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  private initForm(): FormGroup<RegisterForm> {
    return new FormGroup<RegisterForm>({
      name: new FormControl('', {validators: [Validators.required, fullNameValidator], nonNullable: true}),
      email: new FormControl('', {validators: [Validators.required, emailValidator], nonNullable: true}),
      gender: new FormControl('male', {validators: [Validators.required], nonNullable: true}),
    });
  }
}
