import {KlassSelectComponent} from './klass-select.component';
import {TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';
import {TeacherMockApi} from '../../mock-api/teacher.mock.api';
import {Component, OnInit} from '@angular/core';
import {getTestScheduler} from 'jasmine-marbles';

@Component({
  template: '<h1 (click)="onTest()">Test:</h1><app-klass-select [formControl]="teacherIdFormControl"></app-klass-select>'
})
class TestComponent implements OnInit {
  teacherIdFormControl = new FormControl(1);

  ngOnInit(): void {
    console.log('父组件初始化');
  }

  onTest(): void {
    console.log('teacherId值为', this.teacherIdFormControl.value);
  }
}

describe('KlassSelectComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KlassSelectComponent, TestComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS, multi: true,
          useClass: MockApiTestingInterceptor.forRoot([
            TeacherMockApi
          ])
        }
      ]
    })
      .compileComponents();
  });

  it('响应式表单', () => {
    // 创建一个组件夹具（容器），这就像我们要测试显卡是否正常功能时，需要有一台供显卡工作的电脑一样。
    // testFixture便是TestComponent这块显卡赖以工作的电脑
    console.log('开始创建父组件');
    const fixture = TestBed.createComponent(TestComponent);

    // 获取testFixture这台电脑上的testComponent显卡
    const component = fixture.componentInstance;
    // 调用detectChanges()渲染V层，开始渲染V层中的子组件。
    // 由于当前Test组件未请求后台，所以省略了getTestScheduler().flush();
    // 当然了，写上也无防
    console.log('首次渲染组件');
    fixture.detectChanges();

    // 模拟返回数据后，进行变更检测重新渲染子组件V层
    console.log('触发后台模拟数据发送');
    getTestScheduler().flush();
    console.log('重新渲染组件');
    fixture.detectChanges();
  });
});
