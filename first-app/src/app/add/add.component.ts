import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  teacher = {
    name: '',
    username: '',
    email: '',
    sex: true
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.teacher);
  }
}
