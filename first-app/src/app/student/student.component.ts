import {Component, OnDestroy, OnInit} from '@angular/core';
import {Page} from '../entity/page';
import {Student} from '../entity/student';
import {StudentService} from '../service/student.service';
import {environment} from '../../environments/environment';
import {Confirm, Report} from 'notiflix';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {
  pageData = {} as Page<Student>;
  page = 0;
  size = environment.size;

  /**
   * 当前组件所有的订阅信息
   */
  subscriptions = new Array<Subscription>();


  constructor(private studentService: StudentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData(this.page);
    this.subscriptions.push(this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(event => {
        event = event as NavigationEnd;
        if (event.url === '/student') {
          console.log('感知到了路由事件，重新请求数据');
          this.loadData(this.page);
        }
      }));
  }

  /**
   * 加载数据
   * @param page 第几页
   */
  loadData(page: number): void {
    this.studentService.pageOfCurrentTeacher({
      page,
      size: this.size
    }).subscribe(data => {
      data.content = data.content.map(d => new Student(d));
      this.pageData = data;
    });
  }

  onDelete(index: number, id: number): void {
    console.log(Confirm);
    Confirm.show('请确认', '该操作不可逆', '确认', '取消',
      () => {
        this.studentService.delete(id)
          .subscribe(() => this.pageData.content.splice(index, 1));
      }, () => {
        console.log('cancel');
      });
  }

  /**
   * 点击分页时触发
   * @param $event 第几页
   */
  onPage($event: number): void {
    this.page = $event;
    this.loadData(this.page);
  }

  /**
   * 批量删除按钮被点击
   */
  onBatchDeleteClick(): void {
    const beDeleteIds = this.pageData.content.filter(s => s._checked).map(d => d.id);
    if (beDeleteIds.length === 0) {
      Report.warning('出错啦', '请先选择要删除的学生', '返回');
    } else {
      Confirm.show('请确认', '该操作不可逆', '确认', '取消',
        () => {
          // 调用批量删除
          this.studentService.batchDelete(beDeleteIds)
            .subscribe(() => {
              this.loadData(this.page);
            });
        });
    }
  }

  /**
   * 生产项目中，应该在组件销毁时，取消所有的订阅
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
