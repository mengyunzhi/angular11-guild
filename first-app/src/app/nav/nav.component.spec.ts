import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavComponent} from './nav.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [RouterTestingModule]
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
    // 接收组件的beLogout发送数据的数据
    let called = false;
    component.beLogout.subscribe(() => {
      console.log('接收到了数据');
      called = true;
    });

    // 调用onSubmit方法
    component.onSubmit();

    // 如果的确在1步接收成功，就说明onSubmit方法成功的弹出了数据；否则，说明未成功，报异常
    expect(called).toBeTrue();
  });

});
