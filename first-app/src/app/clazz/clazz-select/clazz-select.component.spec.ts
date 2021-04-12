import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClazzSelectComponent} from './clazz-select.component';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

@Component({
  template: `
    <app-clazz-select [formControl]="clazzId"></app-clazz-select>`
})
class TestComponent {
  clazzId = new FormControl();
}

describe('ClazzSelectComponent', () => {
  let component: ClazzSelectComponent;
  let fixture: ComponentFixture<ClazzSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClazzSelectComponent, TestComponent],
      imports: [
        MockApiTestingModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('父组件向子组件传值', () => {
    // 消除beforeEach对当前测试用例的影响
    fixture.destroy();

    // 创建父组件
    const testFixture = TestBed.createComponent(TestComponent);
    const testComponent = testFixture.componentInstance;
    // 在父组件上执行变更检测，开始渲染子组件
    testFixture.detectChanges();

    // 获取子组件
    const clazzSelectComponent =
      testFixture.debugElement.query(By.directive(ClazzSelectComponent)).componentInstance as ClazzSelectComponent;
    console.log(clazzSelectComponent);
    expect(clazzSelectComponent).toBeTruthy();

    // 设置父组件的classId，断言子组件接收成功
    testComponent.clazzId.setValue(4);
    getTestScheduler().flush();
    testFixture.detectChanges();
    expect(clazzSelectComponent.clazzId.value).toEqual(4);
  });

  it('子组件向父组件传值', () => {
    // 消除beforeEach对当前测试用例的影响
    fixture.destroy();

    // 创建父组件
    const testFixture = TestBed.createComponent(TestComponent);
    const testComponent = testFixture.componentInstance;
    // 在父组件上执行变更检测，开始渲染子组件
    testFixture.detectChanges();

    // 获取子组件
    const clazzSelectComponent =
      testFixture.debugElement.query(By.directive(ClazzSelectComponent)).componentInstance as ClazzSelectComponent;
    console.log(clazzSelectComponent);
    expect(clazzSelectComponent).toBeTruthy();

    // 子组件设置classId，断言父组件接收成功
    clazzSelectComponent.clazzId.setValue(8);
    testFixture.detectChanges();
    expect(testComponent.clazzId.value).toEqual(8);
  });
});
