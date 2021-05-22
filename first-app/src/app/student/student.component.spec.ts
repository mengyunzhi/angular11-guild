import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentComponent} from './student.component';
import {RouterTestingModule} from '@angular/router/testing';
import {getTestScheduler} from 'jasmine-marbles';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {By} from '@angular/platform-browser';
import {PageModule} from '../clazz/page/page.module';

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
});
