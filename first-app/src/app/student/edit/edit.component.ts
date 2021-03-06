import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {YzValidators} from '../../yz-validators';
import {YzAsyncValidators} from '../../yz-async-validators';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../../service/student.service';
import {Assert} from '@yunzhi/ng-mock-api';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;
  id: number | undefined;

  constructor(private yzAsyncValidators: YzAsyncValidators,
              private activatedRoute: ActivatedRoute,
              private studentService: StudentService,
              private router: Router) {
    console.log(this.activatedRoute);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl(''),
      phone: new FormControl('', YzValidators.phone),
      email: new FormControl(),
      clazzId: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log('路由参数发生了变化', params);
      this.id = +params.id;
      Assert.isNumber(this.id, '接收到的id类型不正确');
      this.loadData(this.id);
    });
  }

  /**
   * 更新
   * @param id id
   * @param formGroup 表单组
   */
  onSubmit(id: number | undefined, formGroup: FormGroup): void {
    const formValue = formGroup.value as { name: string, phone: string, email: string, clazzId: number };
    Assert.isString(formValue.name, formValue.phone, formValue.email, '类型必须为字符串');
    Assert.isNumber(formValue.clazzId, '类型必须为number');
    Assert.isNumber(id, 'id类型必须为number');
    this.studentService.update(id as number, {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      clazz: {id: formValue.clazzId}
    }).subscribe(() => {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    });
  }

  /**
   * 根据ID加载学生信息
   * @param id 学生ID
   */
  loadData(id: number): void {
    this.studentService.getById(id)
      .subscribe(student => {
        this.formGroup.setValue({
          name: student.name,
          number: student.number,
          phone: student.phone,
          email: student.email,
          clazzId: student.clazz.id
        });
      });
  }
}
