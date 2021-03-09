import {Component, OnInit} from '@angular/core';
import {Teacher} from '../entity/teacher';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

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
    let httpHeaders = new HttpHeaders();
    const authString = 'zhangsan:codedemo.club';
    const authToken = btoa(authString);
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + authToken);
    const url = 'http://angular.api.codedemo.club:81/teacher/me';
    this.httpClient.get<Teacher>(url,
      {headers: httpHeaders, observe: 'response'})
      .subscribe((teacherResponse: HttpResponse<Teacher>) => {
          console.log('请求当前登录用户成功');
          this.me = teacherResponse.body as Teacher;
          console.log(teacherResponse.headers.get('x-auth-token'));
        },
        error => console.log('请求当前登录用户发生错误', error));
  }
}
