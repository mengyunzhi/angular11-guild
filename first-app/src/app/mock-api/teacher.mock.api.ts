import {ApiInjector, MockApiInterface, randomNumber} from '@yunzhi/ng-mock-api';

/**
 * 教师模拟API
 */
export class TeacherMockApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
    return [{
      // 获取所有教师
      method: 'GET',
      url: 'teacher',
      result: [
        {
          id: randomNumber(),
          name: '教师姓名1'
        },
        {
          id: randomNumber(),
          name: '教师姓名2'
        }
      ]
    }];
  }
}
