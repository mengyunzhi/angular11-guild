import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {AppComponent} from '../app.component';
import {LoginComponent} from '../login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent, AppComponent, LoginComponent],
      imports: [HttpClientModule, FormsModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
