import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Page} from '../../entity/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @Input()
  page: Page<any> = new Page({
    content: [],
    number: 0,
    size: 0,
    numberOfElements: 0
  });
  pages: number[] = [];
  currentPage = 0;

  @Output()
  bePageChange = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
    console.log('page组件调用ngOnInit()方法');
    console.log('当前页', this.page.number);
    console.log('总页数', this.page.totalPages);
  }

  onPage(page: number): void {

  }
}
