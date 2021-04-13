import {ApiInjector, MockApiInterface, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';

/**
 * 学生模拟API.
 */
export class StudentMockApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
    return [{
      method: 'GET',
      url: '/student/numberIsExist',
      result: (urlMatches: any, options: RequestOptions): boolean => {
        const params = options.params as HttpParams;
        if (!params.has('number')) {
          throw new Error('未接收到查询参数number');
        }
        const stuNumber = params.get('number') as string;
        if (stuNumber === '032282') {
          return true;
        } else {
          return false;
        }
      }
    }];
  }
}
