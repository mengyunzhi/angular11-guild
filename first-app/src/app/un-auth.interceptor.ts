import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './service/auth.service';

@Injectable()
export class UnAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
    console.log('authService注入成功', authService);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError(error => {
        if (error.status === 401) {
          console.log('发生了401错误, 通知应用显示登录界面', error);
          this.authService.unAuthSubject.next();
        }
        // 使用throwError()继续向上抛出异常
        return throwError(error);
      }));
  }
}
