import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
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
