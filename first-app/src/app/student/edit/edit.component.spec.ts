import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ClazzSelectModule} from '../../clazz/clazz-select/clazz-select.module';
import {ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';


describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockApiTestingModule, RouterModule, RouterTestingModule,
        ClazzSelectModule, ReactiveFormsModule],
      declarations: [EditComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: '123'})
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: (...args: any) => {
              console.log('调用了navigate方法', args);
            }
          }
        }
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
  });

  it('onSubmit', () => {
    // 发送数据，使用组件使用MockApi返回的数据初始化
    getTestScheduler().flush();
    fixture.autoDetectChanges();

    // 使用组件中的formGroup来触发onSubmit()方法
    component.onSubmit(component.id as number, component.formGroup);
    getTestScheduler().flush();
  });

  /**
   * 每个测试用例执行结束后，都执行一次此方法
   */
  afterEach(() => {
    // 发送尚未发送的数据，可以避免两次相近执行的单元测试不互相影响
    getTestScheduler().flush();

    // 统一调用自动检测功能
    fixture.autoDetectChanges();
  });
});
