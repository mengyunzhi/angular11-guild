import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  teacher = {
    name: '',
    username: '',
    email: '',
    sex: true
  };

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.teacher);
    this.httpClient
      .post('http://angular.api.codedemo.club:81/teacher', this.teacher)
      .subscribe((result) => {
        console.log('接收到返回数据', result);
      });
  }
}
