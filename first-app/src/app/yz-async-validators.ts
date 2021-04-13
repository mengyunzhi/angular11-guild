import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

/**
 * 异步验证器.
 */
export class YzAsyncValidators {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 验证方法，学号不存在验证通过
   * @param control FormControl
   */
  numberNotExist(): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      console.log(this.httpClient);
      console.log('异步验证器被调用');
      return of(null)
        .pipe(delay(1000), tap(data => console.log('验证器返回数据', data)));
    };
  }
}
