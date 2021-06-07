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
    // 初始化最大页码，起始页码
    let maxCount;
    let begin;

    if (this.inputPage.totalPages > 7) {
      // 大于7页时，仅显示7页
      maxCount = 7;

      // 起始页为当前页-3.比如当前页为10，则应该由7页开始
      begin = this.inputPage.number - 3;
      if (begin < 0) {
        // 判断是否越界，可以删除下一行代码查看错误的效果
        begin = 0;
      } else if (begin > this.inputPage.totalPages - 7) {
        // 判断是否越界，可以删除下一行代码查看错误的效果
        begin = this.inputPage.totalPages - 7;
      }
    } else {
      // 小于等于7页时，使用原算法。页码数为总页数，页码由0开始
      maxCount = this.inputPage.totalPages;
      begin = 0;
    }

    // 生成页数数组
    this.pages = [];
    for (let i = 0; i < maxCount; i++, begin++) {
      this.pages.push(begin);
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
