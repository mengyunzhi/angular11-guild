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
    // 获取缓存中的login，能获取到则设置login为true
    if (window.sessionStorage.getItem('login') !== null) {
      this.login = true;
    }
  }

  onLogin(teacher: Teacher): void {
    console.log(new Date().toTimeString(), '子组件进行了数据弹射', teacher);
    this.login = true;
    // 将登录状态写入缓存
    window.sessionStorage.setItem('login', 'true');
  }

  onLogout(): void {
    console.log('接收到注销组件的数据弹射，开始注销');
    this.login = false;
    window.sessionStorage.removeItem('login');
  }
}
