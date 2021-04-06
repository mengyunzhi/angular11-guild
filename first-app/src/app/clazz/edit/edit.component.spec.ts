import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {KlassSelectComponent} from '../klass-select/klass-select.component';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {getTestScheduler} from 'jasmine-marbles';
import {RouterTestingModule} from '@angular/router/testing';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent, KlassSelectComponent],
      imports: [
        MockApiTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // 在该代码前进行了组件初始化，模拟请求了教师列表数据。
    // 此代码将返回还未响应的所有请求，包含：教师列表数据
    getTestScheduler().flush();

    component.loadById(123);
    // loadByIdy方法中触发了请求123班级数据
    // 此代码将返回还未响应的所有请求，包含：请求ID为123的班级数据
    getTestScheduler().flush();

    // 最后启动变更检测，则formControl也会被重新渲染
    fixture.autoDetectChanges();
  });
});
