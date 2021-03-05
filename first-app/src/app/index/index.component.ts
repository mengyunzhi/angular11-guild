import {Component, OnInit} from '@angular/core';

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

  onLogin(teacher: { username: string, name: string, email: string, sex: boolean }): void {
    console.log(new Date().toTimeString(), '子组件进行了数据弹射', teacher);
    this.login = true;
  }
}
