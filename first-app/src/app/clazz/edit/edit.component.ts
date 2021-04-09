import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Clazz} from '../../entity/clazz';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Teacher} from '../../entity/teacher';

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

  /**
   * 表单组，用于存放多个formControl
   */
  formGroup = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: this.nameFormControl,
    teacherId: new FormControl(null, Validators.required)
  });

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.loadById(+id);
  }

  /**
   * 由后台加载预编辑的班级.
   * @param id 班级id.
   */
  loadById(id: number): void {
    console.log('loadById');
    this.formGroup.get('id')?.setValue(id);
    this.httpClient.get<Clazz>('/clazz/' + id.toString())
      .subscribe(clazz => {
        console.log('接收到了clazz', clazz);
        this.nameFormControl.patchValue(clazz.name);
        this.formGroup.get('teacherId')?.setValue(clazz.teacher.id);
      }, error => console.log(error));
  }

  onTeacherChange($event: number): void {
    console.log('接收到了选择的teacherId', $event);
    this.formGroup.get('teacherId')?.setValue($event);
  }

  onSubmit(): void {
    console.log('点击了提交按钮');
    const clazzId = this.formGroup.get('id')?.value;
    const name = this.nameFormControl.value;
    const teacherId = this.formGroup.get('teacherId')?.value;
    const clazz = new Clazz({
      name,
      teacher: {id: teacherId} as Teacher
    });
    this.httpClient.put<Clazz>(`/clazz/${clazzId}`, clazz)
      .subscribe(
        () => this.router.navigate(['../../'], {relativeTo: this.activatedRoute}),
        error => console.log(error));
  }
}
