import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Teacher} from '../entity/teacher';
import {XAuthTokenInterceptor} from '../x-auth-token.interceptor';
import {ApiInterceptor} from '../api.interceptor';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        HttpClientModule
      ],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: XAuthTokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();

    console.log(fixture.elementRef.nativeElement);
    const rootDivElement = fixture.elementRef.nativeElement as HTMLDivElement;
    const submitButtonElement = rootDivElement.querySelector('button') as HTMLButtonElement;
    console.log(submitButtonElement);

    spyOn(component, 'onSubmit').and.callFake(() => console.log('间谍方法被调用'));
    // 点击按钮以前，onSubmit方法应该被调用了0次。
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
    submitButtonElement.click();
    // 点击按钮以后，onSubmit方法应该被调用了1次。
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('onSubmit 用户登录', () => {
    // 启动自动变更检测
    fixture.autoDetectChanges();
    component.teacher = {username: '张三', password: 'codedemo.club'} as Teacher;
    component.onSubmit();
  });

  it('显示错误', fakeAsync(() => {
    // 初始化不显示错误提醒
    expect(component.showError).toBe(false);
    fixture.detectChanges();

    // 立即显示错误提醒
    component.showErrorDelay();
    expect(component.showError).toBe(true);
    console.log(new Date());
    fixture.detectChanges();

    // 将时钟模拟向前推进15000MS
    tick(15000);
    console.log(new Date());
    fixture.detectChanges();

    // 断言错误提醒消息
    expect(component.showError).toBe(false);
    fixture.autoDetectChanges();
  }));
});
