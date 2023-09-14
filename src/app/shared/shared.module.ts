import { NgModule } from '@angular/core';
import { FormModule } from './components/form/form.module';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';

const components = [
  ModalComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    FormModule,
    CommonModule
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
