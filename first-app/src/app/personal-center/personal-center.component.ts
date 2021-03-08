import {Component, OnInit} from '@angular/core';
import {Teacher} from '../entity/teacher';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {
  me = {} as Teacher;

  constructor() {
  }

  ngOnInit(): void {
    this.me = new Teacher(
      1,
      'zhangsan@yunzhi.club',
      '张三',
      'password',
      null as unknown as boolean,
      'zhangsan'
    );
  }

}
