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
    this.httpClient.get<Page<Clazz>>('/clazz/page',
      {params: new HttpParams().append('size', this.size.toString())})
      .subscribe(pageData => this.pageData = pageData);
  }

  onPage(page: number): void {
    const httpParams = new HttpParams().append('page', page.toString())
      .append('size', this.size.toString());
    this.httpClient.get<Page<Clazz>>('/clazz/page', {params: httpParams})
      .subscribe(pageData => {
        // 在请求数据之后设置当前页
        this.page = page;
        this.pageData = pageData;
        console.log(pageData);
      });
  }
}
