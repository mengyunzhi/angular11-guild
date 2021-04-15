import {TestBed} from '@angular/core/testing';

import {StudentService} from './student.service';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {HttpClient} from '@angular/common/http';

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
});
