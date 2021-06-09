import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {YzValidators} from '../../yz-validators';
import {YzAsyncValidators} from '../../yz-async-validators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private yzAsyncValidators: YzAsyncValidators) {
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

  }
}
