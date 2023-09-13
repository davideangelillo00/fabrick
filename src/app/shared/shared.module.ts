import { NgModule } from '@angular/core';
import { FormModule } from './components/form/form.module';


@NgModule({
  declarations: [
  ],
  imports: [
    FormModule
  ],
  exports: [
    FormModule
  ]
})
export class SharedModule { }
