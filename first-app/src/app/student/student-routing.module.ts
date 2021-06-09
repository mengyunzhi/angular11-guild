import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {StudentComponent} from './student.component';
import {AddComponent} from './add/add.component';

const routes = [
  {
    path: '',
    component: StudentComponent
  },
  {
    path: 'add',
    component: AddComponent
  }
] as Route[];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
