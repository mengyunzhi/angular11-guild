import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {getTestScheduler} from 'jasmine-marbles';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockApiTestingModule],
      declarations: [EditComponent]
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
