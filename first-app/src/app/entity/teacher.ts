/**
 * 教师（用户）
 */
export class Teacher {
  id: number;
  email: string;
  name: string;
  password: string;
  sex: boolean;
  username: string;

  constructor(id: number, email: string, name: string, password: string, sex: boolean, username: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.sex = sex;
    this.username = username;
  }
}
