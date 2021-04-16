import {Component, OnInit} from '@angular/core';
import {Page} from '../entity/page';
import {Student} from '../entity/student';
import {StudentService} from '../service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  pageData = {} as Page<Student>;
  page = 0;
  size = 20;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.studentService.pageOfCurrentTeacher({
      page: this.page,
      size: this.size
    }).subscribe(data => this.pageData = data);
  }

  onDelete(index: number, id: number): void {
  }
}
