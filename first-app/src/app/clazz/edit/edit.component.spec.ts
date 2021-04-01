import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {KlassSelectComponent} from '../klass-select/klass-select.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {TeacherMockApi} from '../../mock-api/teacher.mock.api';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent, KlassSelectComponent],
      imports: [
        HttpClientModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: MockApiInterceptor.forRoot([TeacherMockApi])
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
