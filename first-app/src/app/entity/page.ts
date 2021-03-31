/**
 * 分页.
 * @author 河北工业大学梦云智开发团队
 */
export class Page<T> {
  content: T[];
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  totalPages: number;

  constructor(data: {
    content: T[],
    last?: boolean,
    number: number,
    size: number,
    numberOfElements: number,
    first?: boolean,
    totalPages?: number
  }) {
    this.content = data.content;
    this.number = data.number;
    this.size = data.size;
    this.numberOfElements = data.numberOfElements;
    if (data.last !== undefined) {
      this.last = data.last;
    } else {
      this.last = (this.number + 1) * this.size >= this.numberOfElements ? true : false;
    }

    if (data.first !== undefined) {
      this.first = data.first;
    } else {
      this.first = this.number === 0 ? true : false;
    }

    if (data.totalPages !== undefined) {
      this.totalPages = data.totalPages;
    } else {
      // Math.ceil()实现上取整，比如共10条记录，每页6条，则 10 / 6 = 1.x
      // Math.ceil(1.x) = 2 得出共2页
      this.totalPages = Math.ceil(this.numberOfElements / this.size);
    }
  }
}
