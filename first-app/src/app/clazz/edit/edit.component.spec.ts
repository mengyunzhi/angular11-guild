import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {KlassSelectComponent} from '../klass-select/klass-select.component';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {getTestScheduler} from 'jasmine-marbles';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent, KlassSelectComponent],
      imports: [
        MockApiTestingModule,
        ReactiveFormsModule
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
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
