import {Component, OnInit} from '@angular/core';
import {Page} from '../entity/page';
import {Clazz} from '../entity/clazz';
import {Teacher} from '../entity/teacher';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-clazz',
  templateUrl: './clazz.component.html',
  styleUrls: ['./clazz.component.css']
})
export class ClazzComponent implements OnInit {
  // 默认显示第1页的内容
  page = 0;

  // 每页默认为3条
  size = 3;

  // 分页数组
  pages = [] as number[];

  // 初始化一个有0条数据的
  pageData = new Page<Clazz>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    console.log('clazz组件调用ngOnInit()');
    // 使用默认值 page = 0 调用loadByPage()方法
    this.loadByPage();
  }

  onPage(page: number): void {
    this.loadByPage(page);
  }

  loadByPage(page = 0): void {
    const httpParams = new HttpParams().append('page', page.toString())
      .append('size', this.size.toString());
    this.httpClient.get<Page<Clazz>>('/clazz/page', {params: httpParams})
      .subscribe(pageData => {
        // 在请求数据之后设置当前页
        this.page = page;
        console.log('clazz组件接收到返回数据，重新设置pageData');
        this.pageData = pageData;
        console.log(pageData);
        // 根据返回的值生成分页数组
        this.pages = [];
        for (let i = 0; i < pageData.totalPages; i++) {
          this.pages.push(i);
        }
      });
  }
}
