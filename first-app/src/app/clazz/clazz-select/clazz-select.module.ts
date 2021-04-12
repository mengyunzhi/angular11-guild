import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClazzSelectComponent} from './clazz-select.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ClazzSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ClazzSelectComponent
  ]
})
export class ClazzSelectModule {
}
