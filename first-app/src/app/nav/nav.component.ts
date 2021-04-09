import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output()
  beLogout = new EventEmitter<void>();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const url = 'http://angular.api.codedemo.club:81/teacher/logout';
    this.httpClient.get(url)
      .subscribe(() => this.beLogout.emit(undefined),
        error => console.log('logout error', error));
  }
}
