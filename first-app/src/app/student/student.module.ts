import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {ReactiveFormsModule} from '@angular/forms';
import { StudentComponent } from './student.component';
import {PageModule} from '../clazz/page/page.module';
import {RouterModule} from '@angular/router';
import {StudentRoutingModule} from './student-routing.module';
import {ClazzSelectModule} from '../clazz/clazz-select/clazz-select.module';


@NgModule({
  declarations: [AddComponent, StudentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageModule,
    RouterModule,
    StudentRoutingModule,
    ClazzSelectModule
  ]
})
export class StudentModule {
}
