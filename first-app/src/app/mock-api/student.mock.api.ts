import {ApiInjector, Assert, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Student} from '../entity/student';
import {Page} from '../entity/page';
import {randomString} from '@yunzhi/ng-mock-api/testing';
import {Clazz} from '../entity/clazz';
import {Teacher} from '../entity/teacher';

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
    }, {
      method: 'GET',
      url: '/student/pageOfCurrentTeacher',
      result: (urlMatches: string[], options: RequestOptions) => {
        const httpParams = options.params as HttpParams;
        const page = +(httpParams.get('page') as string);
        const size = +(httpParams.get('size') as string);
        Assert.isNumber(page, size, 'page size must be number');
        const students = [] as Array<Student>;
        for (let i = 0; i < size; i++) {
          students.push({
            id: i + 1,
            name: randomString('姓名'),
            number: randomNumber(10000).toString(),
            phone: '13900001111',
            clazz: {
              name: randomString('班级名称'),
              teacher: {
                name: randomString('教师名称')
              } as Teacher
            } as Clazz
          } as Student);
        }

        return {
          content: students,
          number: page,
          size,
          totalPages: (page + 1 + randomNumber(10)) * size
        } as Page<Student>;
      }
    }, {
      method: 'DELETE',
      url: '/student/(\\d+)'
    }, {
      method: 'DELETE',
      url: '/student/batchDeleteIds',
      result: ((urlMatches: any, options: RequestOptions) => {
        const httpParams = options.params as HttpParams;
        const ids = httpParams.getAll('ids');
        Assert.isArray(ids, '未接收到ids');
      })
    }
    ];
  }
}
