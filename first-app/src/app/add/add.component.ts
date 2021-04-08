import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Teacher} from '../entity/teacher';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  teacher = new Teacher({
    name: '',
    username: '',
    email: '',
    sex: true
  });

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.teacher);
    this.httpClient
      .post('/teacher', this.teacher)
      .subscribe((result) => {
        console.log('接收到返回数据', result);
        this.router.navigate(['teacher']);
      }, (error) => {
        console.log('请求失败', error);
      });
  }
}
