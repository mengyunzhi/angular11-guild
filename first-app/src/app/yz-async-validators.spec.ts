import { YzAsyncValidators } from './yz-async-validators';
import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('YzAsyncValidators', () => {
  it('should create an instance', async () => {
    // 配置动态测试模块
    await TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    // 获取动态测试模块中可被注入的HttpClient实例
    const httpClient = TestBed.inject(HttpClient);

    expect(new YzAsyncValidators(httpClient)).toBeTruthy();
  });
});
