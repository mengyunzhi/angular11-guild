import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {root} from 'rxjs/internal-compatibility';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();

    console.log(fixture.elementRef.nativeElement);
    const rootDivElement = fixture.elementRef.nativeElement as HTMLDivElement;
    const submitButtonElement = rootDivElement.querySelector('button') as HTMLButtonElement;
    console.log(submitButtonElement);

    spyOn(component, 'onSubmit').and.callFake(() => console.log('间谍方法被调用'));
    // 点击按钮以前，onSubmit方法应该被调用了0次。
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
    submitButtonElement.click();
    // 点击按钮以后，onSubmit方法应该被调用了1次。
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });
});
