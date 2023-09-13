import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';

const components = [
  InputComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ReactiveFormsModule
  ],
  exports: [
    ...components
  ]
})
export class FormModule { }
