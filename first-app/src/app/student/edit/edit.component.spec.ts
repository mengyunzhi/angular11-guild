import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {ClazzSelectModule} from '../../clazz/clazz-select/clazz-select.module';
import {ReactiveFormsModule} from '@angular/forms';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockApiTestingModule, RouterModule, RouterTestingModule,
        ClazzSelectModule, ReactiveFormsModule],
      declarations: [EditComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: '123'}}}}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
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
