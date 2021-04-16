import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentComponent} from './student.component';
import {RouterTestingModule} from '@angular/router/testing';
import {getTestScheduler} from 'jasmine-marbles';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentComponent],
      imports: [
        RouterTestingModule,
        MockApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('onInit', () => {
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
