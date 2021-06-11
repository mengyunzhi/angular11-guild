import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentComponent} from './student.component';
import {RouterTestingModule} from '@angular/router/testing';
import {getTestScheduler} from 'jasmine-marbles';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {By} from '@angular/platform-browser';
import {PageModule} from '../clazz/page/page.module';
import {PageComponent} from '../clazz/page/page.component';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentComponent],
      imports: [
        RouterTestingModule,
        MockApiTestingModule,
        PageModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit', () => {
    // 在后台模拟数据返回以前，断言table列表中的`tr`仅有标题一行。
    const table = fixture.debugElement.query(By.css('table')).nativeElement as HTMLTableElement;
    console.log('打印的非对象类型，在控制台查看到的是执行代码时的即时值。当前table的高度为：', table.clientHeight);
    console.log('打印对象类型，在控制台查看到的是该对象的最终值。', table);
    expect(table.querySelectorAll('tr').length).toEqual(1);
    getTestScheduler().flush();
    fixture.autoDetectChanges();
    // 在后台模拟数据返回以后，然后启动变更检测来更新V层，断言table列表中的`tr`大于一行。
    expect(table.querySelectorAll('tr').length).toBeGreaterThan(1);
  });

  it('与分页子组件交互测试', () => {
    // 模拟后台立即返回数据，接着使用返回的数据重新渲染组件
    getTestScheduler().flush();
    fixture.detectChanges();

    // 获取分页组件
    const pageComponent = fixture.debugElement.query(By.directive(PageComponent)).componentInstance as PageComponent;
    expect(pageComponent).toBeTruthy();

    // input测试，先mock掉子组件被调用的方法
    const spy = spyOnProperty(pageComponent, 'page', 'set');
    // 然后重新为当前组件的pageData赋值
    const pageData = {...{}, ...component.pageData};
    component.pageData = pageData;

    // 重新渲染子组件，触发set page()方法
    fixture.detectChanges();

    // 断言子组件对应的方法被成功调用
    expect(spy).toHaveBeenCalledWith(pageData);

    // 触发子组件弹出并重新进行渲染，未发生异常说明子组件弹值后父组件可以正确处理子组件的弹出数据
    pageComponent.bePageChange.emit(2);
    getTestScheduler().flush();
    fixture.detectChanges();

    // output测试，先mock掉父组件的方法
    const onPageSpy = spyOn(component, 'onPage');
    // 调用子组件的弹射器，向父组件传值
    pageComponent.bePageChange.emit(1);
    // 断言父组件的方法被调用
    expect(onPageSpy).toHaveBeenCalledWith(1);
  });
});
