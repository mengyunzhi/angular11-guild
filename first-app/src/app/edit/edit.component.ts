import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Teacher} from '../entity/teacher';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  // 使用as进行类型转换
  teacher = new Teacher();

  constructor(private activeRoute: ActivatedRoute,
              private httpClient: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params.id;

    // 拼接请求URL
    const url = '/teacher/' + id;
    // 发起请求，成功时并打印请求结果，失败时打印失败结果
    this.httpClient.get<Teacher>(url)
      .subscribe(data => this.teacher = data,
        error => console.log('失败', error)
      );
  }

  onSubmit(): void {
    console.log(this.teacher);
    // 获取ID，拼接URL
    const url = '/teacher/' +
      this.activeRoute.snapshot.params.id;
    // 发起请求，更新教师，成功时打印请求结果并刷新教师列表查看效果，失败时打印失败结果
    this.httpClient.put(url, this.teacher)
      .subscribe(data => {
          console.log('更新成功', data);
          this.router.navigate(['teacher']);
        },
        error => console.log('更新错误', error));
  }
}
