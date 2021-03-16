import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output()
  beLogout = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.beLogout.emit(undefined);
  }
}
