import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

/**
 * 异步验证器.
 */
export class YzAsyncValidators {
  /**
   * 验证方法
   * @param control FormControl
   */
  static validate(control: AbstractControl): Observable<ValidationErrors | null> {
    console.log('异步验证器被调用');
    return of(null)
      .pipe(delay(1000));
  }
}
