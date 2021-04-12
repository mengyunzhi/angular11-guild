import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Clazz} from '../../entity/clazz';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-clazz-select',
  templateUrl: './clazz-select.component.html',
  styleUrls: ['./clazz-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return ClazzSelectComponent;
      })
    }
  ]
})
export class ClazzSelectComponent implements OnInit, ControlValueAccessor {
  clazzes = new Array<Clazz>();

  clazzId = new FormControl();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // 获取所有教师
    this.httpClient.get<Array<Clazz>>('/clazz/allOfCurrentTeacher')
      .subscribe(
        clazzes => {
          this.clazzes = clazzes;
        });
  }

  registerOnChange(fn: (data: number) => void): void {
    this.clazzId.valueChanges
      .subscribe(clazzId => fn(clazzId));
  }

  registerOnTouched(fn: any): void {
    console.warn('registerOnTouched尚未实现');
  }

  writeValue(obj: number): void {
    this.clazzId.setValue(obj);
  }
}
