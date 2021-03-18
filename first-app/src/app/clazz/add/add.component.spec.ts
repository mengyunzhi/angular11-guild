import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {XAuthTokenInterceptor} from '../../x-auth-token.interceptor';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [
        {provide: HTTP_INTERCEPTORS, multi: true, useClass: XAuthTokenInterceptor}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  fit('onSubmit', () => {
    component.clazz = {
      name: 'test',
      teacherId: 1
    };
    const httpClient = TestBed.inject(HttpClient) as HttpClient;

    const authString = 'zhangsan:codedemo.club';
    const authToken = btoa(authString);
    const httpHeaders = new HttpHeaders().append('Authorization', 'Basic ' + authToken);
    httpClient.get('http://angular.api.codedemo.club:81/teacher/login', {headers: httpHeaders})
      .subscribe(() => {
        component.onSubmit();
      });
  });
});
