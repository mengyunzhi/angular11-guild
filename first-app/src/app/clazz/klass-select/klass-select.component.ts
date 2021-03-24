import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Teacher} from '../../entity/teacher';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-klass-select',
  templateUrl: './klass-select.component.html',
  styleUrls: ['./klass-select.component.css']
})
export class KlassSelectComponent implements OnInit {
  teachers = new Array<Teacher>();
  teacherId: number | undefined;

  @Output()
  beChange = new EventEmitter<number>();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // 获取所有教师
    this.httpClient.get<Array<Teacher>>('teacher')
      .subscribe(teachers => this.teachers = teachers);
  }

  onChange(): void {
    console.log('change called');
    console.log(this.teacherId);
    this.beChange.emit(this.teacherId);
  }
}
