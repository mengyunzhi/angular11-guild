import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // 初始化教师数组
  teachers = [] as Teacher[];

  constructor(private httpClient: HttpClient) {
    console.log(httpClient);
  }

  /**
   * 组件初始化完成后将被自动执行一次
   */
  ngOnInit(): void {
    this.httpClient.get<Teacher[]>('http://angular.api.codedemo.club:81/teacher')
      .subscribe(teachers => this.teachers = teachers);
  }

  onDelete(id: number): void {
    const url = `http://angular.api.codedemo.club:81/teacher/${id}`;
    this.httpClient.delete(url)
      .subscribe(() => this.ngOnInit(),
        error => console.log('删除失败', error));
  }
}

/**
 * 定义一个类型
 */
type Teacher = {
  id: number,
  name: string,
  username: string,
  email: string,
  sex: true
};
