import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiInterceptor} from './api.interceptor';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
      ],
    }).compileComponents();
  });

  it('组件初始化', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();

    // 启用angular的自动变更检测机制，自动对V层中的数据进行渲染
    fixture.autoDetectChanges();
  });
});
