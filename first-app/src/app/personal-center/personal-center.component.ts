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
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('x-auth-token', '02d4bb26-991e-4902-b80f-3ef436909766');

    const url = 'http://angular.api.codedemo.club:81/teacher/me';
    this.httpClient.get<Teacher>(url,
      {headers: httpHeaders, observe: 'response'})
      .subscribe(teacherResponse => {
          console.log('请求当前登录用户成功');
          this.me = teacherResponse.body as Teacher;
          console.log(teacherResponse.headers.keys());
        },
        error => console.log('请求当前登录用户发生错误', error));
  }
}
