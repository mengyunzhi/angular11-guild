import {Component, OnInit} from '@angular/core';
import {Teacher} from '../entity/teacher';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {
  me = {} as Teacher;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    const authString = 'zhangsan:codedemo.club';
    const authToken = btoa(authString);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + authToken);
    httpHeaders = httpHeaders.append('Cookie', 'test cookie');

    this.httpClient
      .get<Teacher>(
        'http://angular.api.codedemo.club:81/teacher/login',
        {headers: httpHeaders})
      .subscribe(() => {
          console.log('登录成功，接着尝试获取当前登录用户');
          const url = 'http://angular.api.codedemo.club:81/teacher/me';
          this.httpClient.get<Teacher>(url)
            .subscribe(teacher => {
                console.log('请求当前登录用户成功');
                this.me = teacher;
              },
              error => console.log('请求当前登录用户发生错误', error));
        },
        error => console.log('发生错误, 登录失败', error));
  }
}
