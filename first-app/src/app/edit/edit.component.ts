import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params.id;
    console.log('获取到的路由参数id值为', id);
  }

}
