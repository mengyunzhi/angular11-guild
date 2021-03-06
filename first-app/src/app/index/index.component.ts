import {Component, OnInit} from '@angular/core';
import {Teacher} from '../entity/teacher';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  login = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onLogin(teacher: Teacher): void {
    console.log(new Date().toTimeString(), '子组件进行了数据弹射', teacher);
    this.login = true;
  }
}
