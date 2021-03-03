import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  teacher = {} as {
    username: string,
    password: string
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('点击了登录按钮');
  }
}
