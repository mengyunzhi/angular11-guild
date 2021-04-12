import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavComponent} from './nav.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('v层注销按钮', () => {
    // 获取V层的注销按钮
    // 在c层的相关方法中安插间谍
    // 点击注销按钮，则间谍方法应该被调用
  });

  it('onSubmit', () => {
    // 获取一个httpim
    let httpTestingController: HttpTestingController;
    httpTestingController = TestBed.inject(HttpTestingController);

    // 接收组件的beLogout发送数据的数据
    let called = false;
    component.beLogout.subscribe(() => {
      console.log('接收到了数据');
      called = true;
    });

    // 调用onSubmit方法
    component.onSubmit();

    // 断言onSubmit()方法被调用后，向http://angular.api.codedemo.club/teacher/logout地址发起了请求
    const req = httpTestingController.expectOne('http://angular.api.codedemo.club:81/teacher/logout');

    // 断言上述请求的方法为GET
    expect(req.request.method).toEqual('GET');

    // 由于引用HttpClientTestingModule的原因，实际上并没有向API发送请求，所以API当然也不可能给它发送响应数据
    // 我们使用如下方法来模块一个空响应。这样一来，对于组件而言就好像是接收到了API的响应一样。
    req.flush(null);

    // 如果的确在1步接收成功，就说明onSubmit方法成功的弹出了数据；否则，说明未成功，报异常
    expect(called).toBeTrue();

    // 使用这种模拟HTTP请求的方法，一般我们在最后在加入如下的语言，以防止一些在预期以外的请求发生
    httpTestingController.verify();
  });

});
