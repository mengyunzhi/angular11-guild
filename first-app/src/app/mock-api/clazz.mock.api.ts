import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';

/**
 * 班级模拟API
 */
export class ClazzMockApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
    return [
      {
        method: 'POST',
        url: 'clazz',
        result: (urlMatches: string[], options: RequestOptions) => {
          console.log('接收到了数据请求，请求主体的内容为：', options.body);
          const clazz = options.body;
          if (!clazz.name || clazz.name === '') {
            throw new Error('班级名称未定义或为空');
          }

          if (!clazz.teacher || !clazz.teacher.id) {
            throw new Error('班主任ID未定义');
          }

          return {
            id: randomNumber(),
            name: '保存的班级名称',
            createTime: new Date().getTime(),
            teacher: {
              id: clazz.teacher.id,
              name: '教师姓名'
            }
          };
        }
      }
    ];
  }
}
