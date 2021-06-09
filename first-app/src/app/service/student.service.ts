import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Student} from '../entity/student';
import {Clazz} from '../entity/clazz';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../entity/page';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 新增学生.
   */
  add(data: { name: string, number: string, phone: string, email: string, clazzId: number }): Observable<Student> {
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

  /**
   * 批量删除
   * @param ids 学生ID数组
   */
  batchDelete(ids: number[]): Observable<void> {
    const stringIds = ids.map(id => id.toString());
    return this.httpClient.delete<void>('/student/batchDeleteIds', {params: {ids: stringIds}});
  }


  /**
   * 删除
   * @param id 学生ID
   */
  delete(id: number): Observable<void> {
    const url = '/student/' + id.toString();
    return this.httpClient.delete<void>(url);
  }

  /**
   * 获取学生
   * @param id 学生ID
   */
  getById(id: number): Observable<Student> {
    return this.httpClient.get<Student>('/student/' + id.toString());
  }

  /**
   * 当前登录用户的分页信息
   * @param data 分页信息
   */
  pageOfCurrentTeacher({page = 0, size = 20}: { page?: number, size?: number }): Observable<Page<Student>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());
    return this.httpClient.get<Page<Student>>('/student/pageOfCurrentTeacher', {params: httpParams});
  }

  /**
   * 更新学生
   * @param id 学生ID
   * @param student 学生信息
   */
  update(id: number, student: { name: string, phone: string, email: string, clazz: { id: number } }): Observable<Student> {
    return this.httpClient.put<Student>(`/student/${id}`, student);
  }
}
