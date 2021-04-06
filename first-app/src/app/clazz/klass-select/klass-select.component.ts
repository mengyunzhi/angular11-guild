import {Component, OnInit, EventEmitter, Output, Input, forwardRef} from '@angular/core';
import {Teacher} from '../../entity/teacher';
import {HttpClient} from '@angular/common/http';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-klass-select',
  templateUrl: './klass-select.component.html',
  styleUrls: ['./klass-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        console.log('useExisting->forwardRef中的回调方法被调用一次');
        return KlassSelectComponent;
      })
    }
  ]
})
export class KlassSelectComponent implements OnInit, ControlValueAccessor {
  teachers = new Array<Teacher>();
  teacherId = new FormControl();

  @Input()
  set id(id: number) {
    // 使用接收到的id设置teacherId
    this.teacherId.setValue(id);
  }

  @Output()
  beChange = new EventEmitter<number>();

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 将FormControl中的值通过此方法写入
   * FormControl的值每变换一次，该方法将被重新执行一次
   * 相当于@Input() set xxx
   * @param obj 此类型取决于当前组件的接收类型，比如此时我们接收一个类型为number的teacherId
   */
  writeValue(obj: number): void {
    console.log('writeValue is called');
    this.teacherId.setValue(obj);
  }

  /**
   * 组件需要向父组件弹值时，直接调用参数中的fn方法
   * 相当于@Output()
   * @param fn 此类型取决于当前组件的弹出值类型，比如我们当前将弹出一个类型为number的teacherId
   */
  registerOnChange(fn: (data: number) => void): void {
    console.log(`registerOnChange is called`);
    this.teacherId.valueChanges
      .subscribe(data => fn(data));
  }

  registerOnTouched(fn: any): void {
    console.warn('registerOnTouched not implemented');
  }

  ngOnInit(): void {
    console.log('教师选择组件初始化');
    // 关注teacherId
    this.teacherId.valueChanges
      .subscribe((data: number) => this.beChange.emit(data));
    // 获取所有教师
    this.httpClient.get<Array<Teacher>>('teacher')
      .subscribe(
        teachers => {
          this.teachers = teachers;
          console.log('教师选择组件接收到了数据');
        });
  }
}
