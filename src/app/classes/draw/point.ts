import {Utils} from '../utils';
import {Vector} from '../geometry/vector';

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number);
  constructor(that: Point);
  constructor(...args: never[]) {
    switch (Utils.joinArgumentsConstructorNames(args)) {
      case('Number;Number'): {
        const x = args[0];
        const y = args[1];
        this.x = x;
        this.y = y;
        break;
      }
      case('Point'): {
        const that = <Vector> args[0];
        this.x = that.x;
        this.y = that.y;
        break;
      }
      default:
        throw Utils.wrongArgumentsException(args);
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
