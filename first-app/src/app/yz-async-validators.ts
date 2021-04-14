import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

/**
 * 异步验证器.
 */
@Injectable({
  providedIn: 'root'
})
export class YzAsyncValidators {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 验证方法，学号不存在验证通过
   * @param control FormControl
   */
  numberNotExist(): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const httpParams = new HttpParams()
        .append('number', control.value);
      return this.httpClient.get<boolean>('/student/numberIsExist', {params: httpParams})
        .pipe(map(exists => exists ? {numberExist: true} : null));
    };
  }
}
