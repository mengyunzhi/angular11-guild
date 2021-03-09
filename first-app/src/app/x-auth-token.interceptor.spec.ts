import {TestBed} from '@angular/core/testing';

import {XAuthTokenInterceptor} from './x-auth-token.interceptor';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

describe('XAuthTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      XAuthTokenInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: XAuthTokenInterceptor = TestBed.inject(XAuthTokenInterceptor);
    expect(interceptor).toBeTruthy();

    // 定义一个observable，在其上调用subscribe将得到数字1
    const observable = of(1).pipe(map(input => input * 2));
    observable.subscribe(
      data => console.log(data),
      error => {
      },
      () => console.log('complete')
    );
  });
});
