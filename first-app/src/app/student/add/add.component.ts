import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl(),
    number: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    clazzId: new FormControl()
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('submit');
  }
}
