import {Teacher} from './teacher';

export class Clazz {
  id: number;
  name: string;
  teacher: Teacher;

  constructor(data = {} as {
    id?: number;
    name?: string;
    teacher?: Teacher;
  }) {
    this.id = data.id as number;
    this.name = data.name as string;
    this.teacher = data.teacher as Teacher;
  }
}
