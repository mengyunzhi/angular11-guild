import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Teacher} from '../../entity/teacher';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private url = 'clazz';
  clazz = {
    name: '',
    teacherId: null as unknown as number
  };

  teachers = new Array<Teacher>();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // 获取所有教师
    this.httpClient.get<Array<Teacher>>('teacher')
      .subscribe(teachers => this.teachers = teachers);
  }

  onSubmit(): void {
    const newClazz = {
      name: this.clazz.name,
      teacher: {
        id: this.clazz.teacherId
      }
    };
    this.httpClient.post(this.url, newClazz)
      .subscribe(clazz => console.log('保存成功', clazz),
        error => console.log('保存失败', error));
  }
}
