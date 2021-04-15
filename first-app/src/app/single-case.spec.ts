import {TestBed} from '@angular/core/testing';
import {Injectable, ModuleWithProviders, NgModule} from '@angular/core';

describe('单例模式相关测试', () => {

  class A {
    key: number;

    constructor(key: number) {
      console.log('a constructor be called');
      this.key = key;
    }
  }

  @NgModule()
  class AModule {
    static forRoot(key: number): ModuleWithProviders<AModule> {
      return {
        ngModule: AModule,
        providers: [
          {provide: A, useValue: new A(key)}
        ]
      };
    }
  }

  @Injectable({providedIn: 'root'})
  class B {
    constructor(private a: A) {
    }
  }

  @Injectable({providedIn: 'root'})
  class C {
    constructor(private a: A) {
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AModule.forRoot(123)
      ]
    })
      .compileComponents();
  });

  it('验证单例', () => {
    const b = TestBed.inject(B);
    console.log(b);
    const c = TestBed.inject(C);
    console.log(c);
  });
});
