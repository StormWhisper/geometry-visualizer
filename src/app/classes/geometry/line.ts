import {Draw} from '../draw/draw';
import {Utils} from '../utils';
import {Vector} from './vector';
import {Segment} from './segment';
import {CanvasStyle} from '../draw/canvas-style.type';

export class Line {
  /**
   * **A**x + By + C = 0
   */
  A = 0;

  /**
   * Ax + **B**y + C = 0
   */
  B = 0;

  /**
   * Ax + By + **C** = 0
   */
  C = 0;

  /**
   * y = **k**x + t
   */
  get k(): number {
    if (this.B === 0) {
      throw new Error('Unable to get k of the vertical line');
    }
    return -this.A / this.B;
  }

  /**
   * y = kx + **t**
   */
  get t(): number {
    if (this.B === 0) {
      throw new Error('Unable to get t of the vertical line');
    }
    return -this.C / this.B;
  }

  getX(y: number): number {
    if (this.A === 0) {
      throw new Error('Unable to get one particular x of horizontal line');
    }
    return -(this.B * y + this.C) / this.A;
  }

  getY(x: number): number {
    if (this.B === 0) {
      throw new Error('Unable to get one particular y of vertical line');
    }
    return -(this.A * x + this.C) / this.B;
  }

  // tslint:disable:unified-signatures
  set(A: number, B: number, C: number): Line;
  set(k: number, t: number): Line;
  set(k: number): Line;
  set(x1: number, y1: number, x2: number, y2: number): Line;
  set(vector: Vector): Line;
  set(point1: Vector, point2: Vector): Line;
  set(x1: number, y1: number, point2: Vector): Line;
  set(point1: Vector, x2: number, y2: number): Line;
  set(point: Vector, angle: number): Line;
  set(segment: Segment): Line;
  set(line: Line): Line;
  // tslint:enable:unified-signatures
  set(): Line {
    switch (Utils.joinArgumentsConstructorNames(arguments)) {
      case('Number;Number;Number'): {
        this.A = arguments[0];
        this.B = arguments[1];
        this.C = arguments[2];
        return this;
      }
      case('Number;Number'): {
        const k: number = arguments[0];
        const t: number = arguments[1];
        return this.set(k, -1, t);
      }
      case('Number'): {
        const k: number = arguments[0];
        return this.set(k, -1, 0);
      }
      case('Number;Number;Number;Number'): {
        const x1: number = arguments[0];
        const y1: number = arguments[1];
        const x2: number = arguments[2];
        const y2: number = arguments[3];
        if (x1 === x2 && y1 === y2) {
          throw new Error('Unable to make a line from two coincident points');
        }
        this.A = y1 - y2;
        this.B = x2 - x1;
        this.C = x1 * y2 - x2 * y1;
        return this;
      }
      case('Vector'): {
        const point: Vector = arguments[0];
        return this.set(0, 0, point.x, point.y);
      }
      case('Vector;Vector'): {
        const point1: Vector = arguments[0];
        const point2: Vector = arguments[1];
        return this.set(point1.x, point1.y, point2.x, point2.y);
      }
      case('Number;Number;Vector'): {
        const x1: number = arguments[0];
        const y1: number = arguments[1];
        const point2: Vector = arguments[2];
        return this.set(x1, y1, point2.x, point2.y);
      }
      case('Vector;Number;Number'): {
        const point1: Vector = arguments[0];
        const x2: number = arguments[1];
        const y2: number = arguments[2];
        return this.set(point1.x, point1.y, x2, y2);
      }
      case('Vector;Number'): {
        const point: Vector = arguments[0];
        const angle: number = arguments[1];
        const k = Math.tan(angle);
        const t = point.y - k * point.x;
        return this.set(k, t);
      }
      case('Segment'): {
        const segment: Segment = arguments[0];
        return this.set(
          segment.position.x,
          segment.position.y,
          segment.position.x + segment.vector.x,
          segment.position.y + segment.vector.y
        );
      }
      case('Line'): {
        const line: Line = arguments[0];
        return this.set(line.A, line.B, line.C);
      }
      default:
        throw Utils.wrongArgumentsException(arguments);
    }
  }

  isHorizontal(): boolean {
    return this.A === 0;
  }

  isVertical(): boolean {
    return this.B === 0;
  }

  flipHorizontal(): Line {
    this.B *= -1;
    this.C *= -1;
    return this;
  }

  flipVertical(): Line {
    this.A *= -1;
    this.C *= -1;
    return this;
  }

  draw(
    style: CanvasStyle = Draw.defaultDrawStyle,
    lineWidth: number = Draw.defaultLineWidth
  ): void {
    let x1: number;
    let y1: number;
    let x2: number;
    let y2: number;
    const cornerPoints = Draw.getCornerPoints();
    if (this.A === 0) {
      x1 = cornerPoints.farthestLeft;
      y1 = this.getY(0);
      x2 = cornerPoints.farthestRight;
      y2 = this.getY(0);
    } else {
      x1 = this.getX(cornerPoints.farthestTop);
      y1 = cornerPoints.farthestTop;
      x2 = this.getX(cornerPoints.farthestBottom);
      y2 = cornerPoints.farthestBottom;
    }
    Draw.stroke(Draw.line(x1, y1, x2, y2), style, lineWidth);
  }

  getDistanceToPoint(x: number, y: number): number;
  getDistanceToPoint(vector: Vector): number;
  getDistanceToPoint(): number {
    switch (Utils.joinArgumentsConstructorNames(arguments)) {
      case('Number;Number'): {
        const x: number = arguments[0];
        const y: number = arguments[1];
        return Math.abs(this.A * x + this.B * y + this.C) / Vector.getLength(this.A, this.B);
      }
      case('Vector'): {
        const vector: Vector = arguments[0];
        return this.getDistanceToPoint(vector.x, vector.y);
      }
      default:
        throw Utils.wrongArgumentsException(arguments);
    }
  }
}
