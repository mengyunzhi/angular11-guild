import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClazzComponent} from './clazz.component';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';
import {ClazzMockApi} from '../mock-api/clazz.mock.api';
import {getTestScheduler} from 'jasmine-marbles';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PageComponent} from './page/page.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ClazzComponent', () => {
  let component: ClazzComponent;
  let fixture: ComponentFixture<ClazzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClazzComponent, PageComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS, multi: true,
          useClass: MockApiTestingInterceptor.forRoot([ClazzMockApi])
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
