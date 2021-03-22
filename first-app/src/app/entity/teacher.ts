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

  constructor(data = {} as {
    id?: number, email?: string, name?: string, password?: string, sex?: boolean, username?: string}) {
    this.id = data.id as number;
    this.email = data.email as string;
    this.name = data.name as string;
    this.password = data.password as string;
    this.sex = data.sex as boolean;
    this.username = data.username as string;
  }
}
