import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class StudentModule {
}
