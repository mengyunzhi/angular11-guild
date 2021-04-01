import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Page} from '../../entity/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  inputPage: Page<any> = new Page({
    content: [],
    number: 0,
    size: 0,
    numberOfElements: 0
  });
  pages: number[] = [];
  currentPage = 0;

  @Input()
  set page(page: Page<any>) {
    this.inputPage = page;
    console.log('set page被调用');
    console.log('当前页', this.inputPage.number);
    console.log('总页数', this.inputPage.totalPages);
    // 生成页数数组
    this.pages = [];
    for (let i = 0; i < this.inputPage.totalPages; i++) {
      this.pages.push(i);
    }
    // 设置当前页
    this.currentPage = this.inputPage.number;
  }

  @Output()
  bePageChange = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
    console.log('page组件调用ngOnInit()方法');
    console.log('当前页', this.inputPage.number);
    console.log('总页数', this.inputPage.totalPages);
  }

  onPage(page: number): void {
    // 点击页码时弹出该页码
    this.bePageChange.emit(page);
  }
}
