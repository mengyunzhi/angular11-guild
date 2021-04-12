import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzSelectComponent } from './clazz-select.component';

describe('ClazzSelectComponent', () => {
  let component: ClazzSelectComponent;
  let fixture: ComponentFixture<ClazzSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
