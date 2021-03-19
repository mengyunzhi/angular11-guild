import {AddComponent} from './add.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInjector, MockApiInterceptor, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
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

  it('在MockApi下完成组件测试Submit', () => {
    component.clazz.name = '测试班级名称';
    component.clazz.teacherId = randomNumber();
    component.onSubmit();
  });

  fit('should create', () => {
    fixture.autoDetectChanges();
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
        result: (urlMatches: string[], options: RequestOptions) => {
          console.log('接收到了数据请求，请求主体的内容为：', options.body);
          const clazz = options.body;
          if (!clazz.name || clazz.name === '') {
            throw new Error('班级名称未定义或为空');
          }

          if (!clazz.teacher || !clazz.teacher.id) {
            throw new Error('班主任ID未定义');
          }

          return {
            id: randomNumber(),
            name: '保存的班级名称',
            createTime: new Date().getTime(),
            teacher: {
              id: clazz.teacher.id,
              name: '教师姓名'
            }
          };
        }
      }
    ];
  }
}
