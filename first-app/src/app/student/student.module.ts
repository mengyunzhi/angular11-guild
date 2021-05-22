import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {ReactiveFormsModule} from '@angular/forms';
import { StudentComponent } from './student.component';
import {PageModule} from '../clazz/page/page.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [AddComponent, StudentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageModule,
    RouterModule
  ]
})
export class StudentModule {
}
