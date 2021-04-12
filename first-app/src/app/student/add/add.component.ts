import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {YzValidators} from '../../yz-validators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    phone: new FormControl('', YzValidators.phone),
    email: new FormControl(),
    clazzId: new FormControl(null, Validators.required)
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('submit');
  }
}
