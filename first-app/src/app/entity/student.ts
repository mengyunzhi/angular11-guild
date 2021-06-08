import {Clazz} from './clazz';

/**
 * 学生.
 */
export class Student {
  /**
   *  是否被选中
   */
  _checked = false;

  id: number;
  /**
   * 姓名.
   */
  name: string;
  /**
   * 学号.
   */
  number: string;
  /**
   * 手机号.
   */
  phone: string;
  /**
   * email.
   */
  email: string;
  /**
   * 班级.
   */
  clazz: Clazz;

  constructor(data = {} as
    {
      id?: number,
      name?: string,
      number?: string,
      phone?: string,
      email?: string,
      clazz?: Clazz
    }) {
    this.id = data.id as number;
    this.name = data.name as string;
    this.number = data.number as string;
    this.phone = data.phone as string;
    this.email = data.email as string;
    this.clazz = data.clazz as Clazz;
  }

  public onDeleteClick(): void {
    this._checked = !this._checked;
  }
}
