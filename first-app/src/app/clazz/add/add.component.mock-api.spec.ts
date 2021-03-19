import {AddComponent} from './add.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInjector, MockApiInterceptor, MockApiInterface} from '@yunzhi/ng-mock-api';
import {FormsModule} from '@angular/forms';

describe('clazz add with mockapi', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: MockApiInterceptor.forRoot([ClazzMockApi])
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('在MockApi下完成组件测试Submit', () => {
    component.onSubmit();
  });
});

/**
 * 班级模拟API
 */
class ClazzMockApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
    return [
      {
        method: 'POST',
        url: 'clazz',
        result: {
          id: 1,
          name: '保存的班级名称',
          createTime: 1234232,
          teacher: {
            id: 1,
            name: '教师姓名'
          }
        }
      }
    ];
  }
}
