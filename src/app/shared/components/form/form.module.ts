import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';

const components = [
  InputComponent,
  SelectComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ...components
  ]
})
export class FormModule { }
