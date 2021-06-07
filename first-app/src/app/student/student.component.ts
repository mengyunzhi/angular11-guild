import {Component, OnInit} from '@angular/core';
import {Page} from '../entity/page';
import {Student} from '../entity/student';
import {StudentService} from '../service/student.service';
import {environment} from '../../environments/environment';
import {Confirm} from 'notiflix';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  pageData = {} as Page<Student>;
  page = 0;
  size = environment.size;

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
}
