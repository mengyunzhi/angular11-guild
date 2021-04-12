import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {Clazz} from '../entity/clazz';
import {Teacher} from '../entity/teacher';
import {Page} from '../entity/page';
import {HttpParams} from '@angular/common/http';
import {randomString} from '@yunzhi/ng-mock-api/testing';

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
        result: (urlMatches: string[], options: RequestOptions) => {
          // 初始化两个默认值
          let page = 0;
          let size = 20;

          const httpParams = options.params as HttpParams;
          if (httpParams.has('page')) {
            // 在这里我们使用了`has()`方法来判断是否存在该字段。
            // 所以在此执行httpParams.get('page')必然返回一个非null的值
            // 结合httpParams.get('page')返回值类型规定为null | string
            // null | string去了一个null，则返回值类型必然为string，所以在使用as指定
            // + 的目的是将string类型转换为number
            page = +(httpParams.get('page') as string);
          }

          if (httpParams.get('size')) {
            size = +(httpParams.get('size') as string);
          }

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
            number: page,
            size,
            numberOfElements: size * 10
          });
        }
      },
      {
        method: 'GET',
        url: `/clazz/(\\d+)`,
        result: (urlMatches: Array<string>) => {
          console.log(urlMatches);
          const id = +urlMatches[1];
          return {
            id,
            name: randomString('班级名称'),
            teacher: {
              id: randomNumber(9) + 1,
              name: randomString('教师')
            }
          } as Clazz;
        }
      },
      {
        method: 'PUT',
        url: `/clazz/(\\d+)`,
        result: (urlMatches: string[], options: RequestOptions) => {
          const id = +urlMatches[1];
          const clazz = options.body as Clazz;
          console.log('接收到了id', id);
          console.log('接收到的clazz', clazz);
          return {
            id,
            name: clazz.name,
            teacher: {
              id: clazz.teacher.id,
              name: randomString('测试教师')
            } as Teacher
          } as Clazz;
        }
      },
      {
        method: 'DELETE',
        url: '/clazz/(\\d+)'
      },
      {
        method: 'GET',
        url: '/clazz/allOfCurrentTeacher',
        result: () => {
          const result = [];
          for (let i = 1; i <= 10; i++) {
            const clazz = {
              id: i,
              name: randomString('班级名称')
            } as Clazz;
            result.push(clazz);
          }
          return result;
        }
      }
    ];
  }
}
