import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {YzValidators} from '../../yz-validators';
import {YzAsyncValidators} from '../../yz-async-validators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;

  constructor() {
    const yzAsyncValidators = null as unknown as YzAsyncValidators;
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
    console.log('submit');
  }
}
