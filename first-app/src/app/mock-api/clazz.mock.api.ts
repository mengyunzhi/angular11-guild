import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {Clazz} from '../entity/clazz';
import {Teacher} from '../entity/teacher';
import {Page} from '../entity/page';

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
      },
      {
        method: 'GET',
        url: '/clazz/page',
        result: () => {
          const size = 20;
          const clazzes = new Array<Clazz>();
          for (let i = 0; i < size; i++) {
            clazzes.push(new Clazz({
              id: i,
              name: '班级' + Math.floor(Math.random() * 100).toString(10),
              teacher: new Teacher({
                id: i,
                name: '教师' + Math.floor(Math.random() * 100).toString(10),
              })
            }));
          }
          return new Page<Clazz>({
            content: clazzes,
            number: 2,
            size,
            numberOfElements: 20
          });
        }
      }
    ];
  }
}
