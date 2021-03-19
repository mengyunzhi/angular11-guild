import {TestBed} from '@angular/core/testing';

import {ApiInterceptor} from './api.interceptor';

describe('ApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: ApiInterceptor = TestBed.inject(ApiInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('getApiUrl', () => {
    expect(ApiInterceptor.getApiUrl('clazz'))
      .toEqual('http://angular.api.codedemo.club:81/clazz');
    expect(ApiInterceptor.getApiUrl('/clazz'))
      .toEqual('http://angular.api.codedemo.club:81/clazz');
  });
});
