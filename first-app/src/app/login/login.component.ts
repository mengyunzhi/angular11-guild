import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  teacher = {} as {
    username: string,
    password: string
  };

  @Output()
  beLogin = new EventEmitter<{ username: string, name: string, email: string, sex: boolean }>();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('点击了登录按钮');
    const authString = encodeURIComponent(this.teacher.username) + ':' + this.teacher.password;
    console.log(authString);
    const authToken = btoa(authString);
    console.log(authToken);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + authToken);

    this.httpClient
      .get<any>(
        'http://angular.api.codedemo.club:81/teacher/login',
        {headers: httpHeaders})
      .subscribe(teacher => this.beLogin.emit(teacher),
        error => console.log('发生错误, 登录失败', error));
  }
}
