import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClazzSelectModule} from '../../clazz/clazz-select/clazz-select.module';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoadingModule} from '../../directive/loading/loading.module';
import {randomString} from '@yunzhi/ng-mock-api/testing';
import {randomNumber} from '@yunzhi/ng-mock-api';

describe('student -> AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [
        ReactiveFormsModule,
        ClazzSelectModule,
        MockApiTestingModule,
        LoadingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();

    fixture.autoDetectChanges();
  });

  it('自动填充要新建的学生数据', () => {
    // 固定写法
    getTestScheduler().flush();
    fixture.detectChanges();

    component.formGroup.setValue({
      name: randomString('姓名'),
      number: randomNumber().toString(),
      phone: '13900000000',
      email: '123@yunzhi.club',
      clazzId: randomNumber(10)
    });

    // 固定写法
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });

  it('理解map操作符', () => {
    // 数据源发送数据1
    const a = of(1) as Observable<number>;
    a.subscribe(data => console.log(data));

    // 数据源还是发送数据1
    const b = of(1) as Observable<number>;
    // 使用pipe，但不加任何管道
    const c = b.pipe() as Observable<number>;
    c.subscribe(data => console.log(data));

    // 接着发送数据源1，通过map操作符完成number到string的转换
    const d = of(1) as Observable<number>;
    const e = d.pipe(map(data => {
      console.log('map操作符接收到的值的类型为：', typeof data);
      const result = data.toString();
      console.log('map操作符转换后的值的类型为：', typeof result);
      return result;
    })) as Observable<string>;
    e.subscribe(data => console.log(data));

    // 下面的写法与上面的效果一样，当箭头函数中仅有一行代码时，可以省略该代码的return关键字
    const f = of(1) as Observable<number>;
    const g = f.pipe(map(data => data.toString())) as Observable<string>;
    g.subscribe(data => console.log(data));

    // 除进行一般的类型转换外，还可以转换为任意类型
    const h = of(1).pipe(map(data => {
      return {value: data};
    })) as Observable<{ value: number }>;
    h.subscribe(data => console.log(data));

    // 当然也可以转换为null类型
    const i = of(1).pipe(map(data => {
      if (data !== 1) {
        return {test: data};
      } else {
        return null;
      }
    })) as Observable<{ value: number } | null>;
    i.subscribe(data => console.log(data));
  });
});
