import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {YzValidators} from '../../yz-validators';
import {YzAsyncValidators} from '../../yz-async-validators';
import {ActivatedRoute} from '@angular/router';
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
              private studentService: StudentService) {
    console.log(this.activatedRoute);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required, yzAsyncValidators.numberNotExist()),
      phone: new FormControl('', YzValidators.phone),
      email: new FormControl(),
      clazzId: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params.id;
    Assert.isNumber(this.id, '接收到的id类型不正确');
    this.loadData(this.id);
  }

  onSubmit(): void {

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
