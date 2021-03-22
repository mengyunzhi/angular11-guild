import {AddComponent} from './add.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInjector, MockApiInterceptor, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {FormsModule} from '@angular/forms';
import {ClazzMockApi} from '../../mock-api/clazz.mock.api';
import {TeacherMockApi} from '../../mock-api/teacher.mock.api';

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
          useClass: MockApiInterceptor.forRoot([ClazzMockApi, TeacherMockApi])
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

  it('should create', () => {
    fixture.autoDetectChanges();
  });
});
