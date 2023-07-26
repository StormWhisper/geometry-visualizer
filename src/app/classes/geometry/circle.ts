import {Draw} from '../draw/draw';
import {Utils} from '../utils';
import {Vector} from './vector';
import {CanvasStyle} from '../draw/canvas-style.type';

export class Circle {
  position = new Vector();
  radius = 0;

  set(x: number, y: number, radius: number): Circle;
  set(vector: Vector, radius: number): Circle;
  set(...args: never[]): Circle {
    switch (Utils.joinArgumentsConstructorNames(args)) {
      case('Number;Number;Number'): {
        const x = args[0];
        const y = args[1];
        const radius = args[2];
        this.position.set(x, y);
        this.radius = radius;
        return this;
      }
      case('Vector;Number'): {
        const vector = args[0];
        const radius = args[1];
        this.position.set(vector);
        this.radius = radius;
        return this;
      }
      default:
        throw Utils.wrongArgumentsException(args);
    }
  }

  draw(
    style: CanvasStyle = Draw.defaultDrawStyle,
    lineWidth: number = Draw.defaultLineWidth
  ): void {
    Draw.stroke(Draw.circle(this.position.x, this.position.y, this.radius), style, lineWidth);
  }
}
