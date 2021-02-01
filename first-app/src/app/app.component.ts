import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // 初始化教师数组
  teachers = [] as any[];

  constructor(private httpClient: HttpClient) {
    console.log(httpClient);
  }

  /**
   * 组件初始化完成后将被自动执行一次
   */
  ngOnInit(): void {
    this.httpClient.get<[]>('assets/teacher-all.json')
      .subscribe(teachers => this.teachers = teachers);
  }
}
