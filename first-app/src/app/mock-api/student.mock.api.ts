import {ApiInjector, Assert, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Student} from '../entity/student';

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
    }, {
      method: 'POST',
      url: '/student',
      result: ((urlMatches: string[], options: RequestOptions) => {
        const student = options.body as Student;
        Assert.isString(student.phone, student.email, student.number, student.name, '学生的基本信息未传全');
        Assert.isNumber(student.clazz.id, '班级id校验失败');
        student.id = randomNumber();
        return student;
      })
    }
    ];
  }
}
