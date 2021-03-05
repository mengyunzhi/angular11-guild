import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IndexComponent} from '../index/index.component';

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

  constructor(private httpClient: HttpClient,
              private indexComponent: IndexComponent) {
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
      .get(
        'http://angular.api.codedemo.club:81/teacher/login',
        {headers: httpHeaders})
      .subscribe(teacher => this.indexComponent.login = true,
        error => console.log('发生错误, 登录失败', error));
  }
}
