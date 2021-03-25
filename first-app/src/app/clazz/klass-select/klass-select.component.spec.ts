import {ComponentFixture, TestBed} from '@angular/core/testing';

import {KlassSelectComponent} from './klass-select.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TeacherMockApi} from '../../mock-api/teacher.mock.api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';
import {getTestScheduler} from 'jasmine-marbles';
import {By} from '@angular/platform-browser';

describe('KlassSelectComponent', () => {
  let component: KlassSelectComponent;
  let fixture: ComponentFixture<KlassSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KlassSelectComponent],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
    component.beChange
      .subscribe((data: number) => console.log('接收到了弹出的数据', data));

    // 手动控制MockApi发送数据
    getTestScheduler().flush();
    fixture.detectChanges();

    // 模拟点击教师列表中的第二个教师
    console.log(component.teachers.length);
    const teacher = component.teachers[1];
    console.log(teacher);

    component.teacherId.setValue(teacher.id);
  });

  it('模拟点击option', () => {
    expect(component).toBeTruthy();
    component.beChange
      .subscribe((data: number) => console.log('接收到了弹出的数据', data));
    // 手动控制MockApi发送数据
    getTestScheduler().flush();
    fixture.detectChanges();

    // 获取select
    const htmlSelect = fixture.debugElement.query(By.css('select')).nativeElement as HTMLSelectElement;
    htmlSelect.click();

    // 获取第二个选项
    const htmlOption = htmlSelect.options[1];
    // 用该选项的值设置select的值，从而实现模块点击
    htmlSelect.value = htmlOption.value;

    // 发送change事件，通知浏览器、angular、观察者select值已经发生了变化
    htmlSelect.dispatchEvent(new Event('change'));
  });
});
