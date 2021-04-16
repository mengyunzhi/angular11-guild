import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {ReactiveFormsModule} from '@angular/forms';
import { StudentComponent } from './student.component';


@NgModule({
  declarations: [AddComponent, StudentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class StudentModule {
}
