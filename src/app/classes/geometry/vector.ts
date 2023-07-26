import {Draw} from '../draw/draw';
import {Utils} from '../utils';
import {Point} from '../draw/point';
import {CanvasStyle} from '../draw/canvas-style.type';

export class Vector {
  static defaultPointRadius = 3;

  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static getLength(x: number, y: number): number {
    return Math.sqrt(x ** 2 + y ** 2);
  }

  static getDistance(x1: number, y1: number, x2: number, y2: number): number;
  static getDistance(point1: Vector, point2: Vector): number;
  static getDistance(x1: number, y1: number, point2: Vector): number;
  static getDistance(point1: Vector, x2: number, y2: number): number;
  static getDistance(...args: never[]): number {
    switch (Utils.joinArgumentsConstructorNames(args)) {
      case('Number;Number;Number;Number'): {
        const x1 = args[0];
        const y1 = args[1];
        const x2 = args[2];
        const y2 = args[3];
        return Vector.getLength(x1 - x2, y1 - y2);
      }
      case('Vector;Vector'): {
        const point1 = <Vector> args[0];
        const point2 = <Vector> args[1];
        return Vector.getDistance(point1.x, point1.y, point2.x, point2.y);
      }
      case('Number;Number;Vector'): {
        const x1 = args[0];
        const y1 = args[1];
        const point2 = <Vector> args[2];
        return Vector.getDistance(x1, y1, point2.x, point2.y);
      }
      case('Vector;Number;Number'): {
        const point1 = <Vector> args[0];
        const x2 = args[1];
        const y2 = args[2];
        return Vector.getDistance(point1.x, point1.y, x2, y2);
      }
      default:
        throw Utils.wrongArgumentsException(args);
    }
  }

  static getAngle(x: number, y: number): number;
  static getAngle(x1: number, y1: number, x2: number, y2: number): number;
  static getAngle(point1: Vector, point2: Vector): number;
  static getAngle(x1: number, y1: number, point2: Vector): number;
  static getAngle(point1: Vector, x2: number, y2: number): number;
  static getAngle(...args: never[]): number {
    switch (Utils.joinArgumentsConstructorNames(args)) {
      case('Number;Number'): {
        const x = args[0];
        const y = args[1];
        if (x === 0 && y === 0) {
          throw new Error('Unable to get angle of a null vector');
        }
        return Math.atan2(y, x);
      }
      case('Number;Number;Number;Number'): {
        const x1 = args[0];
        const y1 = args[1];
        const x2 = args[2];
        const y2 = args[3];
        return Vector.getAngle(x2 - x1, y2 - y1);
      }
      case('Vector;Vector'): {
        const point1 = <Vector> args[0];
        const point2 = <Vector> args[1];
        return Vector.getAngle(point1.x, point1.y, point2.x, point2.y);
      }
      case('Number;Number;Vector'): {
        const x1 = args[0];
        const y1 = args[1];
        const point2 = <Vector> args[2];
        return Vector.getAngle(x1, y1, point2.x, point2.y);
      }
      case('Vector;Number;Number'): {
        const point1 = <Vector> args[0];
        const x2 = args[1];
        const y2 = args[2];
        return Vector.getAngle(point1.x, point1.y, x2, y2);
      }
      default:
        throw Utils.wrongArgumentsException(args);
    }
  }

  static getAngleBetweenVectors(x1: number, y1: number, x2: number, y2: number): number;
  static getAngleBetweenVectors(vector1: Vector, vector2: Vector): number;
  static getAngleBetweenVectors(x1: number, y1: number, vector2: Vector): number;
  static getAngleBetweenVectors(vector1: Vector, x2: number, y2: number): number;
  static getAngleBetweenVectors(...args: never[]): number {
    switch (Utils.joinArgumentsConstructorNames(args)) {
      case('Number;Number;Number;Number'): {
        const x1 = args[0];
        const y1 = args[1];
        const x2 = args[2];
        const y2 = args[3];
        return Math.acos(Vector.scalarProduct(x1, y1, x2, y2) / (Vector.getLength(x1, y1) * Vector.getLength(x2, y2)));
      }
      case('Vector;Vector'): {
        const vector1 = <Vector> args[0];
        const vector2 = <Vector> args[1];
        return Vector.getAngleBetweenVectors(vector1.x, vector1.y, vector2.x, vector2.y);
      }
      case('Number;Number;Vector'): {
        const x1 = args[0];
        const y1 = args[1];
        const vector2 = <Vector> args[2];
        return Vector.getAngleBetweenVectors(x1, y1, vector2.x, vector2.y);
      }
      case('Vector;Number;Number'): {
        const vector1 = <Vector> args[0];
        const x2 = args[1];
        const y2 = args[2];
        return Vector.getAngleBetweenVectors(vector1.x, vector1.y, x2, y2);
      }
      default:
        throw Utils.wrongArgumentsException(args);
    }
  }

  static scalarProduct(x1: number, y1: number, x2: number, y2: number): number;
  static scalarProduct(vector1: Vector, vector2: Vector): number;
  static scalarProduct(x1: number, y1: number, vector2: Vector): number;
  static scalarProduct(vector1: Vector, x2: number, y2: number): number;
  static scalarProduct(...args: never[]): number {
    switch (Utils.joinArgumentsConstructorNames(args)) {
      case('Number;Number;Number;Number'): {
        const x1 = args[0];
        const y1 = args[1];
        const x2 = args[2];
        const y2 = args[3];
        return x1 * x2 + y1 * y2;
      }
      case('Vector;Vector'): {
        const vector1 = <Vector> args[0];
        const vector2 = <Vector> args[1];
        return Vector.scalarProduct(vector1.x, vector1.y, vector2.x, vector2.y);
      }
      case('Number;Number;Vector'): {
        const x1 = args[0];
        const y1 = args[1];
        const vector2 = <Vector> args[2];
        return Vector.scalarProduct(x1, y1, vector2.x, vector2.y);
      }
      case('Vector;Number;Number'): {
        const vector1 = <Vector> args[0];
        const x2 = args[1];
        const y2 = args[2];
        return Vector.scalarProduct(vector1.x, vector1.y, x2, y2);
      }
      default:
        throw Utils.wrongArgumentsException(args);
    }
  }

  static vectorProduct(x1: number, y1: number, x2: number, y2: number): number;
  static vectorProduct(vector1: Vector, vector2: Vector): number;
  static vectorProduct(x1: number, y1: number, vector2: Vector): number;
  static vectorProduct(vector1: Vector, x2: number, y2: number): number;
  static vectorProduct(...args: never[]): number {
    switch (Utils.joinArgumentsConstructorNames(args)) {
      case('Number;Number;Number;Number'): {
        const x1 = args[0];
        const y1 = args[1];
        const x2 = args[2];
        const y2 = args[3];
        return x1 * y2 - y1 * x2;
      }
      case('Vector;Vector'): {
        const vector1 = <Vector> args[0];
        const vector2 = <Vector> args[1];
        return Vector.vectorProduct(vector1.x, vector1.y, vector2.x, vector2.y);
      }
      case('Number;Number;Vector'): {
        const x1 = args[0];
        const y1 = args[1];
        const vector2 = <Vector> args[2];
        return Vector.vectorProduct(x1, y1, vector2.x, vector2.y);
      }
      case('Vector;Number;Number'): {
        const vector1 = <Vector> args[0];
        const x2 = args[1];
        const y2 = args[2];
        return Vector.vectorProduct(vector1.x, vector1.y, x2, y2);
      }
      default:
        throw Utils.wrongArgumentsException(args);
    }
  }

  set(x: number, y: number): Vector;
  set(vector: Vector): Vector;
  set(...args: never[]): Vector {
    switch (Utils.joinArgumentsConstructorNames(args)) {
      case('Number;Number'): {
        const x = args[0];
        const y = args[1];
        this.x = x;
        this.y = y;
        return this;
      }
      case('Vector'): {
        const vector = <Vector> args[0];
        return this.set(vector.x, vector.y);
      }
      default:
        throw Utils.wrongArgumentsException(args);
    }
  }

  add(x: number, y: number): Vector;
  add(vector: Vector): Vector;
  add(...args: never[]): Vector {
    switch (Utils.joinArgumentsConstructorNames(args)) {
      case('Number;Number'): {
        const x = args[0];
        const y = args[1];
        this.x += x;
        this.y += y;
        return this;
      }
      case('Vector'): {
        const vector = <Vector> args[0];
        return this.add(vector.x, vector.y);
      }
      default:
        throw Utils.wrongArgumentsException(args);
    }
  }

  sub(x: number, y: number): Vector;
  sub(vector: Vector): Vector;
  sub(...args: never[]): Vector {
    switch (Utils.joinArgumentsConstructorNames(args)) {
      case('Number;Number'): {
        const x = args[0];
        const y = args[1];
        this.x -= x;
        this.y -= y;
        return this;
      }
      case('Vector'): {
        const vector = <Vector> args[0];
        return this.sub(vector.x, vector.y);
      }
      default:
        throw Utils.wrongArgumentsException(args);
    }
  }

  mul(value: number): Vector {
    this.x *= value;
    this.y *= value;
    return this;
  }

  div(value: number): Vector {
    this.x /= value;
    this.y /= value;
    return this;
  }

  addMultiplied(vector: Vector, multiplier: number): Vector {
    this.x += vector.x * multiplier;
    this.y += vector.y * multiplier;
    return this;
  }

  getLength(): number {
    return Vector.getLength(this.x, this.y);
  }

  setLength(newLength: number): Vector {
    const oldLength = this.getLength();
    if (oldLength === 0) {
      if (newLength === 0) {
        return this;
      } else {
        throw new Error('Unable to set length of a null vector');
      }
    } else {
      return this.mul(newLength / oldLength);
    }
  }

  addLength(value: number): Vector {
    return this.setLength(this.getLength() + value);
  }

  subLength(value: number): Vector {
    return this.setLength(this.getLength() - value);
  }

  mulLength(value: number): Vector {
    return this.setLength(this.getLength() * value);
  }

  divLength(value: number): Vector {
    return this.setLength(this.getLength() / value);
  }

  getAngle(): number {
    return Vector.getAngle(this.x, this.y);
  }

  setAngle(newAngle: number): Vector {
    const length = this.getLength();
    this.x = Math.cos(newAngle) * length;
    this.y = Math.sin(newAngle) * length;
    return this;
  }

  addAngle(value: number): Vector {
    return this.setAngle(this.getAngle() + value);
  }

  subAngle(value: number): Vector {
    return this.setAngle(this.getAngle() - value);
  }

  draw(
    style: CanvasStyle = Draw.defaultDrawStyle,
    lineWidth: number = Draw.defaultLineWidth,
    offsetX = 0,
    offsetY = 0
  ): void {
    if (this.getLength() === 0) {
      console.warn('Attempted to draw a null vector');
      return;
    }
    const startX = offsetX;
    const startY = offsetY;
    const endX = offsetX + this.x;
    const endY = offsetY + this.y;

    Draw.stroke(Draw.line(startX, startY, endX, endY), style, lineWidth);

    const points = [];
    const arrowWingVector = new Vector()
      .set(this)
      .mulLength(-1)
      .setLength(Math.min(
        Math.sqrt(lineWidth) * 8,
        this.getLength()
      )).addAngle(Math.PI * 0.12);
    points.push(new Point(endX + arrowWingVector.x, endY + arrowWingVector.y));
    points.push(new Point(endX, endY));
    arrowWingVector.subAngle(Math.PI * 0.12 * 2);
    points.push(new Point(endX + arrowWingVector.x, endY + arrowWingVector.y));
    Draw.stroke(Draw.polyline(points), style, lineWidth, 'miter');
  }

  drawPoint(
    style: CanvasStyle = Draw.defaultBackgroundStyle,
    radius: number = Vector.defaultPointRadius
  ): void {
    Draw.fill(Draw.circle(this.x, this.y, radius + 1), Draw.defaultBackgroundStyle);
    Draw.fill(Draw.circle(this.x, this.y, radius), Draw.defaultDrawStyle);
    Draw.fill(Draw.circle(this.x, this.y, radius - 1), style);
  }
}
