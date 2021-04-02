import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Clazz} from '../../entity/clazz';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  /**
   * 班级名称.
   */
  nameFormControl = new FormControl('', Validators.required);

  constructor(private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    // 调用loadById方法，获取预编辑的班级
  }

  /**
   * 由后台加载预编辑的班级.
   * @param id 班级id.
   */
  loadById(id: number): void {
    console.log('loadById');
    this.httpClient.get<Clazz>('/clazz/' + id.toString())
      .subscribe(clazz => {
        console.log('接收到了clazz', clazz);
        this.nameFormControl.patchValue(clazz.name);
      }, error => console.log(error));
  }

}
