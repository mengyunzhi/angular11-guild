import {LoadingDirective} from './loading.directive';
import {Component} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ComponentFixture, TestBed} from '@angular/core/testing';

@Component({
  template: `
    <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
      <button class="btn btn-primary" appLoading><i class="fa fa-save"></i>保存</button>
    </form>
  `
})
class TestComponent {
  formGroup = new FormGroup({});

  onSubmit(): void {
    console.log('submit');
  }
}

describe('LoadingDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, LoadingDirective],
      imports: [ReactiveFormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
