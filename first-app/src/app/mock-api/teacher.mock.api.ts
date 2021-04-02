import {ApiInjector, MockApiInterface, randomNumber} from '@yunzhi/ng-mock-api';
import {randomString} from '@yunzhi/ng-mock-api/testing';

/**
 * 教师模拟API
 */
export class TeacherMockApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
    return [{
      // 获取所有教师
      method: 'GET',
      url: 'teacher',
      result: () => {
        const teachers = [];
        for (let i = 1; i <= 10; i++) {
          teachers.push({
            id: i,
            name: randomString('教师姓名')
          });
        }
        return teachers;
      }
    }];
  }
}
