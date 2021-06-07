import {Component, OnInit} from '@angular/core';
import {Page} from '../entity/page';
import {Student} from '../entity/student';
import {StudentService} from '../service/student.service';
import {environment} from '../../environments/environment';
import {Confirm, Report} from 'notiflix';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  pageData = {} as Page<Student>;
  page = 0;
  size = environment.size;

  beDeletedIndexes = new Array<number>();

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.loadData(this.page);
  }

  /**
   * 加载数据
   * @param page 第几页
   */
  loadData(page: number): void {
    this.studentService.pageOfCurrentTeacher({
      page,
      size: this.size
    }).subscribe(data => this.pageData = data);
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
   * checkbox被点击
   * @param index 索引值
   */
  onCheckboxClick(index: number): void {
    if (this.beDeletedIndexes.indexOf(index) === -1) {
      this.beDeletedIndexes.push(index);
    } else {
      this.beDeletedIndexes = this.beDeletedIndexes.filter(i => i !== index)
        .sort((a, b) => b - a);
    }
  }

  /**
   * 批量删除按钮被点击
   */
  onBatchDeleteClick(): void {
    if (this.beDeletedIndexes.length === 0) {
      Report.warning('出错啦', '请先选择要删除的学生', '返回');
    } else {
      Confirm.show('请确认', '该操作不可逆', '确认', '取消',
        () => {
          // 根据index获取ids
          const ids = [] as number[];
          this.beDeletedIndexes.forEach(index => {
            ids.push(this.pageData.content[index].id);
          });
          // 调用批量删除
          this.studentService.batchDelete(ids)
            .subscribe(() => {
              // 重置数据
              this.beDeletedIndexes = [];
              this.loadData(this.page);
            });
        });
    }
  }
}
