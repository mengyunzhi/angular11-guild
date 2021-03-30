import {Component, OnInit} from '@angular/core';
import {Page} from '../entity/page';
import {Clazz} from '../entity/clazz';
import {Teacher} from '../entity/teacher';

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

  constructor() {
  }

  ngOnInit(): void {
    const clazzes = new Array<Clazz>();
    for (let i = 0; i < this.size; i++) {
      clazzes.push(new Clazz({
        id: i,
        name: '班级',
        teacher: new Teacher({
          id: i,
          name: '教师'
        })
      }));
    }
    this.pageData = new Page<Clazz>({
      content: clazzes,
      number: 2,
      size: this.size,
      numberOfElements: 20
    });
  }
}
