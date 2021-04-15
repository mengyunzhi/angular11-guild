import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Student} from '../entity/student';
import {Clazz} from '../entity/clazz';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 新增学生.
   */
  add(data: {name: string, number: string, phone: string, email: string, clazzId: number}): Observable<Student> {
    const student = new Student({
      name: data.name,
      number: data.number,
      phone: data.phone,
      email: data.email,
      clazz: new Clazz({id: data.clazzId})
    });
    // 将预请求信息返回
    return this.httpClient.post<Student>('/student', student);
  }
}
