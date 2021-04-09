import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private key;
  /**
   * Subject是个大V.
   * 本大V只需要发送一个未认证的通知，并不需要传递具体数据，所以泛型为void
   */
  public unAuthSubject = new Subject<void>();

  constructor() {
    console.log('AuthService构造函数被调用');
    this.key = Math.random();
  }
}
