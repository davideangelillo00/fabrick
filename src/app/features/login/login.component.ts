import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'fb-login',
  standalone: true,
  imports: [CommonModule, FormModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  x: FormControl = new FormControl();
  y = this.x.valueChanges.subscribe(val => console.log(val))
}
