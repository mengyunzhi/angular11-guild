import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Teacher} from '../entity/teacher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  teacher = new Teacher();

  @Output()
  beLogin = new EventEmitter<Teacher>();

  /**
   * 是否显示错误信息
   */
  showError = false;

  constructor(private httpClient: HttpClient, private ngZone: NgZone) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('点击了登录按钮');
    const authString = encodeURIComponent(this.teacher.username) + ':'
      + encodeURIComponent(this.teacher.password);
    console.log(authString);
    const authToken = btoa(authString);
    console.log(authToken);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + authToken);

    this.httpClient
      .get<Teacher>(
        '/teacher/login',
        {headers: httpHeaders})
      .subscribe(teacher => this.beLogin.emit(teacher),
        error => {
          console.log('发生错误, 登录失败', error);
          this.showErrorDelay();
        });
  }

  /**
   * 延迟显示错误信息
   */
  showErrorDelay(): void {
    this.showError = true;
    this.ngZone.run(() => {
      setTimeout(() => {
        console.log('1.5秒后触发');
        this.showError = false;
      }, 1500);
    });
  }
}
