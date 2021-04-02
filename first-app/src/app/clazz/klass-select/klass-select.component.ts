import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Teacher} from '../../entity/teacher';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-klass-select',
  templateUrl: './klass-select.component.html',
  styleUrls: ['./klass-select.component.css']
})
export class KlassSelectComponent implements OnInit {
  teachers = new Array<Teacher>();
  teacherId = new FormControl();

  @Output()
  beChange = new EventEmitter<number>();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // 关注teacherId
    this.teacherId.valueChanges
      .subscribe((data: number) => this.beChange.emit(data));
    // 获取所有教师
    this.httpClient.get<Array<Teacher>>('teacher')
      .subscribe(
        teachers => this.teachers = teachers);
  }
}
