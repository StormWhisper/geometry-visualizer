import {Draw} from '../draw/draw';
import {Utils} from '../utils';
import {Vector} from './vector';
import {CanvasStyle} from '../draw/canvas-style.type';

export class Segment {
  position = new Vector();
  vector = new Vector();

  // tslint:disable:unified-signatures
  set(x1: number, y1: number, x2: number, y2: number): Segment;
  set(vector: Vector): Segment;
  set(point1: Vector, point2: Vector): Segment;
  set(x1: number, y1: number, point2: Vector): Segment;
  set(point1: Vector, x2: number, y2: number): Segment;
  set(segment: Segment): Segment;
  // tslint:enable:unified-signatures
  set(): Segment {
    switch (Utils.joinArgumentsConstructorNames(arguments)) {
      case('Number;Number;Number;Number'): {
        const x1 = arguments[0];
        const y1 = arguments[1];
        const x2 = arguments[2];
        const y2 = arguments[3];
        this.position.set(x1, y1);
        this.setEndPosition(x2, y2);
        return this;
      }
      case('Vector'): {
        const vector = arguments[0];
        return this.set(0, 0, vector.x, vector.y);
      }
      case('Vector;Vector'): {
        const point1 = arguments[0];
        const point2 = arguments[1];
        return this.set(point1.x, point1.y, point2.x, point2.y);
      }
      case('Number;Number;Vector'): {
        const x1 = arguments[0];
        const y1 = arguments[1];
        const point2 = arguments[2];
        return this.set(x1, y1, point2.x, point2.y);
      }
      case('Vector;Number;Number'): {
        const point1 = arguments[0];
        const x2 = arguments[1];
        const y2 = arguments[2];
        return this.set(point1.x, point1.y, x2, y2);
      }
      case('Segment'): {
        const segment = arguments[0];
        this.position.set(segment.position);
        this.vector.set(segment.vector);
        return this;
      }
      default:
        throw Utils.wrongArgumentsException(arguments);
    }
  }

  getEndPosition(dst: Vector = new Vector()): Vector {
    return dst.set(this.position).add(this.vector);
  }

  setEndPosition(x: number, y: number): Segment;
  setEndPosition(vector: Vector): Segment;
  setEndPosition(): Segment {
    switch (Utils.joinArgumentsConstructorNames(arguments)) {
      case('Number;Number'): {
        const x = arguments[0];
        const y = arguments[1];
        this.vector.set(x, y).sub(this.position);
        return this;
      }
      case('Vector'): {
        const vector = arguments[0];
        return this.setEndPosition(vector.x, vector.y);
      }
      default:
        throw Utils.wrongArgumentsException(arguments);
    }
  }

  draw(
    style: CanvasStyle = Draw.defaultDrawStyle,
    lineWidth: number = Draw.defaultLineWidth
  ): void {
    Draw.stroke(
      Draw.line(
        this.position.x,
        this.position.y,
        this.position.x + this.vector.x,
        this.position.y + this.vector.y
      ),
      style,
      lineWidth
    );
  }

  drawVector(
    style: CanvasStyle = Draw.defaultDrawStyle,
    lineWidth: number = Draw.defaultLineWidth
  ): void {
    this.vector.draw(style, lineWidth, this.position.x, this.position.y);
  }
}
