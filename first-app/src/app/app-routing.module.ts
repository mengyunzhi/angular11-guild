import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {PersonalCenterComponent} from './personal-center/personal-center.component';
import {WelcomeComponent} from './welcome.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'clazz',
    loadChildren: () => import('./clazz/clazz.module').then(m => {
      console.log('开始加载，调用ClazzModule');
      return m.ClazzModule;
    })
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'teacher',
    component: AppComponent
  },
  {
    path: 'teacher/add',
    component: AddComponent
  },
  {
    path: 'teacher/edit/:id',
    component: EditComponent
  },
  {
    path: 'personal-center',
    component: PersonalCenterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
