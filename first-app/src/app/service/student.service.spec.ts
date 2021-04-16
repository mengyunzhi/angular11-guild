import {TestBed} from '@angular/core/testing';

import {StudentService} from './student.service';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {HttpClient} from '@angular/common/http';
import {getTestScheduler} from 'jasmine-marbles';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockApiTestingModule
      ]
    });
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    // TestBed.inject()可获取到当前动态测试模块的所有服务
    const httpClient = TestBed.inject(HttpClient);
    httpClient.post('/student', {})
      .subscribe(success => console.log('success', success),
        error => console.log('error', error));
  });

  it('pageOfCurrentTeacher', () => {
    let called = false;
    service.pageOfCurrentTeacher({page: 1, size: 2})
      .subscribe(data => {
        // 当called为true时，说明接收到了数据
        called = true;
        expect(data.number).toBe(1);
        expect(data.size).toBe(2);
      });

    // 手动发送数据并断言已成功接收
    getTestScheduler().flush();
    expect(called).toBeTrue();
  });
});
