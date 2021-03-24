import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {KlassSelectComponent} from './klass-select.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {TeacherMockApi} from '../../mock-api/teacher.mock.api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('KlassSelectComponent', () => {
  let component: KlassSelectComponent;
  let fixture: ComponentFixture<KlassSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KlassSelectComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS, multi: true,
          useClass: MockApiInterceptor.forRoot([
            TeacherMockApi
          ])
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
    component.beChange
      .subscribe((data: number) => console.log('接收到了弹出的数据', data));
  });
});
