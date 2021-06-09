import {TestBed} from '@angular/core/testing';

import {StudentService} from './student.service';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {HttpClient} from '@angular/common/http';
import {getTestScheduler} from 'jasmine-marbles';
import {randomNumber} from '@yunzhi/ng-mock-api';
import {randomString} from '@yunzhi/ng-mock-api/testing';

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

  it('delete', () => {
    const id = Math.floor(Math.random() * 10);
    let called = false;
    service.delete(id).subscribe(() => {
      called = true;
    });
    // 由于HTTP请求是异步的，所以在短时间内还没有返回数据，called值仍然为false
    expect(called).toBeFalse();

    // 数据被手动返回后,called值为true
    getTestScheduler().flush();
    expect(called).toBeTrue();
  });

  it('batchDeleteIds', () => {
    const ids = [1, 2, 3];
    let called = false;
    service.batchDelete(ids)
      .subscribe(() => {
        called = true;
      });
    expect(called).toBeFalse();
    getTestScheduler().flush();
    expect(called).toBeTrue();
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

  it('JSON对象与对象', () => {
    class Test {
      id: number;
      name: string;

      constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
      }

      sayHello(): void {
        console.log('hello');
      }
    }

    const test = new Test(1, '123');
    console.log(test.id);
    console.log(test.name);
    test.sayHello();

    const jsonString = '{"id": 2, "name": "456"}';
    const jsonTest = JSON.parse(jsonString) as Test;
    console.log(jsonTest.id);
    console.log(jsonTest.name);
    // jsonTest.sayHello();
  });

  it('getById', () => {
    // 返回前面已经请求的数据(如有)，避免产生数据污染。
    getTestScheduler().flush();

    const id = randomNumber();
    let called = false;
    service.getById(id).subscribe(student => {
      called = true;
      expect(student).toBeTruthy();
    });
    expect(called).toBeFalse();

    getTestScheduler().flush();
    expect(called).toBeTrue();
  });

  it('update', () => {
    // 返回前面已经请求的数据(如有)，避免产生数据污染。
    getTestScheduler().flush();

    const id = randomNumber();
    let called = false;
    service.update(id, {
      name: randomString(),
      email: randomString(),
      phone: randomString(),
      clazz: {id: randomNumber()}}).subscribe(student => {
        called = true;
        expect(student).toBeTruthy();
    });
    expect(called).toBeFalse();

    getTestScheduler().flush();
    expect(called).toBeTrue();
  });
});

