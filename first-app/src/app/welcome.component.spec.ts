import {TestBed} from '@angular/core/testing';
import {WelcomeComponent} from './welcome.component';

describe('welcome', () => {
  it('welcome create', () => {
    // 配置动态测试模块
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent]
    }).compileComponents();

    const welcomeComponent = TestBed.createComponent(WelcomeComponent);
    expect(welcomeComponent).toBeTruthy();
  });
});
