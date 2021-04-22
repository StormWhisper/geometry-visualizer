import {Utils} from '../utils';

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number);
  constructor(that: Point);
  constructor() {
    switch (Utils.joinArgumentsConstructorNames(arguments)) {
      case('Number;Number'): {
        const x = arguments[0];
        const y = arguments[1];
        this.x = x;
        this.y = y;
        break;
      }
      case('Point'): {
        const that = arguments[0];
        this.x = that.x;
        this.y = that.y;
        break;
      }
      default:
        throw Utils.wrongArgumentsException(arguments);
    }
  }

  applyMatrix(matrix: DOMMatrix): Point {
    const newX = this.x * matrix.a + this.y * matrix.c + matrix.e;
    const newY = this.x * matrix.b + this.y * matrix.d + matrix.f;
    this.x = newX;
    this.y = newY;
    return this;
  }
}
