import {TestBed} from '@angular/core/testing';

import {UnAuthInterceptor} from './un-auth.interceptor';

describe('UnAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnAuthInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: UnAuthInterceptor = TestBed.inject(UnAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
