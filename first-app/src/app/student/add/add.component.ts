import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {YzValidators} from '../../yz-validators';
import {YzAsyncValidators} from '../../yz-async-validators';
import {StudentService} from '../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private studentService: StudentService, private yzAsyncValidators: YzAsyncValidators,
              private router: Router, private route: ActivatedRoute) {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required, yzAsyncValidators.numberNotExist()),
      phone: new FormControl('', YzValidators.phone),
      email: new FormControl(),
      clazzId: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const student = this.formGroup.value as {
      name: string,
      number: string,
      phone: string,
      email: string,
      clazzId: number
    };
    this.studentService.add(student)
      .subscribe(success => this.router.navigate(['../'], {relativeTo: this.route}),
        error => console.log('保存失败', error));
  }
}
