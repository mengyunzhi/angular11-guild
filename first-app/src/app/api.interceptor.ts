import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private static api = 'http://angular.api.codedemp.club/api';

  /**
   * 获取带有API前缀的URL.
   */
  public static getApiUrl(url: string): string {
    if (!url.startsWith('http://')) {
      // 如果url不以http打头，则添加api前缀
      if (url.startsWith('/')) {
        // 如果以/打头，比如 /clazz，则直接拼接为：http://angular.api.codedemp.club/api/clazz
        return this.api + url;
      } else {
        // 如果不以/打头，比如clazz，则接拼的时候加入/
        return this.api + '/' + url;
      }
    } else {
      return url;
    }
  }

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 获取带有前缀的url
    const url = ApiInterceptor.getApiUrl(request.url);
    // 克隆一个req出来，原因见xAuthToken拦截器
    const req = request.clone({url});
    // 转发到下一个
    return next.handle(req);
  }
}
