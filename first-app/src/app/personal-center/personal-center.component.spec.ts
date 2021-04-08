import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalCenterComponent} from './personal-center.component';
import {SexPipe} from './sex.pipe';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from '../api.interceptor';

describe('PersonalCenterComponent', () => {
  let component: PersonalCenterComponent;
  let fixture: ComponentFixture<PersonalCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalCenterComponent, SexPipe],
      imports: [HttpClientModule],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
