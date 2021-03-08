import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalCenterComponent} from './personal-center.component';
import {SexPipe} from './sex.pipe';
import {HttpClientModule} from '@angular/common/http';

describe('PersonalCenterComponent', () => {
  let component: PersonalCenterComponent;
  let fixture: ComponentFixture<PersonalCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalCenterComponent, SexPipe],
      imports: [HttpClientModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
