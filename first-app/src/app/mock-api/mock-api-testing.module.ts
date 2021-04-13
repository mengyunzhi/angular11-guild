import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';
import {ClazzMockApi} from './clazz.mock.api';
import {TeacherMockApi} from './teacher.mock.api';
import {StudentMockApi} from './student.mock.api';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: MockApiTestingInterceptor.forRoot([
        ClazzMockApi,
        TeacherMockApi,
        StudentMockApi
      ])
    }
  ]
})
export class MockApiTestingModule {
}
