import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalCenterComponent} from './personal-center.component';
import {SexPipe} from './sex.pipe';

describe('PersonalCenterComponent', () => {
  let component: PersonalCenterComponent;
  let fixture: ComponentFixture<PersonalCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalCenterComponent, SexPipe]
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
