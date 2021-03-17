import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {AppComponent} from '../app.component';
import {LoginComponent} from '../login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {NavComponent} from '../nav/nav.component';
import {By} from '@angular/platform-browser';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent, AppComponent, LoginComponent, NavComponent],
      imports: [HttpClientModule, FormsModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('与注销组件对接', () => {
    // 显示民航组件
    component.login = true;
    fixture.detectChanges();

    // 在index组件相应的方法中安插间谍
    spyOn(component, 'onLogout');

    // nav组件弹数据
    // 如何来获取这个nav组件呢？
    const navComponent = fixture.debugElement.query(By.directive(NavComponent));
    console.log('获取到了导航组件', navComponent);
    const navComponentInstance = navComponent.componentInstance as NavComponent;
    navComponentInstance.beLogout.emit();

    // index组件接收数据
    // 断言间谍方法被调用，则说明nav组件弹数据后，index相应的方法将被调用
    expect(component.onLogout).toHaveBeenCalled();
  });
});
