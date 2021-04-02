import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Clazz} from '../../entity/clazz';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  teacherId: number | undefined;
  /**
   * 表单组，用于存放多个formControl
   */
  formGroup = new FormGroup({
    name: this.nameFormControl
  });

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
        this.teacherId = clazz.teacher.id;
      }, error => console.log(error));
  }

  onTeacherChange($event: number): void {
    console.log('接收到了选择的teacherId', $event);
    this.teacherId = $event;
  }

  onSubmit(): void {
    console.log('点击了提交按钮');
  }
}
