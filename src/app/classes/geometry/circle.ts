import {Draw} from '../draw/draw';
import {Utils} from '../utils';
import {Vector} from './vector';
import {CanvasStyle} from '../draw/canvas-style.type';

export class Circle {
  position = new Vector();
  radius = 0;

  set(x: number, y: number, radius: number): Circle;
  set(vector: Vector, radius: number): Circle;
  set(): Circle {
    switch (Utils.joinArgumentsConstructorNames(arguments)) {
      case('Number;Number;Number'): {
        const x = arguments[0];
        const y = arguments[1];
        const radius = arguments[2];
        this.position.set(x, y);
        this.radius = radius;
        return this;
      }
      case('Vector;Number'): {
        const vector = arguments[0];
        const radius = arguments[1];
        this.position.set(vector);
        this.radius = radius;
        return this;
      }
      default:
        throw Utils.wrongArgumentsException(arguments);
    }
  }

  draw(
    style: CanvasStyle = Draw.defaultDrawStyle,
    lineWidth: number = Draw.defaultLineWidth
  ): void {
    Draw.stroke(Draw.circle(this.position.x, this.position.y, this.radius), style, lineWidth);
  }
}
