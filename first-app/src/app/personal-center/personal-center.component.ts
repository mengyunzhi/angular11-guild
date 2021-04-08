import {Component, OnInit} from '@angular/core';
import {Teacher} from '../entity/teacher';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {
  me = new Teacher();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    const url = '/teacher/me';
    this.httpClient.get<Teacher>(url)
      .subscribe(teacher => {
          console.log('请求当前登录用户成功');
          this.me = teacher;
        },
        error => console.log('请求当前登录用户发生错误', error));
  }
}
