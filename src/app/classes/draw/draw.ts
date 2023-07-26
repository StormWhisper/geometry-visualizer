import {Point} from './point';
import {Shape} from './shape';
import {CanvasStyle} from './canvas-style.type';
import {CornerPoints} from './corner-points';

export class Draw {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static _canvas: HTMLCanvasElement;
  private static _context: CanvasRenderingContext2D;
  static defaultLineWidth = 1;
  static defaultBackgroundStyle: CanvasStyle = 'white';
  static defaultDrawStyle: CanvasStyle = 'black';

  static get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  static get context(): CanvasRenderingContext2D {
    return this._context;
  }

  static setCanvas(canvas: HTMLCanvasElement): void {
    let context;
    try {
      context = canvas.getContext('2d');
    } catch (e) {
      context = null;
    }
    if (context === null) {
      throw new Error('Unable to get 2d context from the canvas');
    } else {
      Draw._canvas = canvas;
      Draw._context = context;
    }
  }

  static stroke(
    shape: Shape,
    style: CanvasStyle = Draw.defaultDrawStyle,
    lineWidth: number = Draw.defaultLineWidth,
    lineJoin: CanvasLineJoin = 'round'
  ): void {
    Draw.context.strokeStyle = style;
    Draw.context.lineWidth = lineWidth;
    Draw.context.lineJoin = lineJoin;
    Draw.context.beginPath();
    shape.apply();
    Draw.context.stroke();
    Draw.context.closePath();
  }

  static fill(
    shape: Shape,
    style: CanvasStyle = Draw.defaultDrawStyle
  ): void {
    Draw._context.fillStyle = style;
    Draw._context.beginPath();
    shape.apply();
    Draw._context.fill();
    Draw._context.closePath();
  }

  static line(x1: number, y1: number, x2: number, y2: number): Shape {
    return new class implements Shape {
      apply(): void {
        Draw.context.moveTo(x1, y1);
        Draw.context.lineTo(x2, y2);
      }
    }();
  }

  static polyline(points: Point[], isClosed = false): Shape {
    return new class implements Shape {
      apply(): void {
        Draw.context.moveTo(points[0].x, points[0].y);
        points.slice(1).forEach(p => Draw.context.lineTo(p.x, p.y));
        if (isClosed) {
          Draw.context.lineTo(points[0].x, points[0].y);
        }
      }
    }();
  }

  static rectangle(x: number, y: number, width: number, height: number): Shape {
    return Draw.polyline(
      [
        new Point(x, y),
        new Point(x + width, y),
        new Point(x + width, y + height),
        new Point(x, y + height)
      ],
      true
    );
  }

  static canvasBorders(): Shape {
    const cornerPoints = Draw.getCornerPoints();
    return Draw.polyline(
      [
        cornerPoints.topLeft,
        cornerPoints.topRight,
        cornerPoints.bottomRight,
        cornerPoints.bottomLeft
      ],
      true
    );
  }

  static arc(
    x: number, y: number,
    radius: number,
    startAngle: number, endAngle: number, anticlockwise?: boolean | undefined
  ): Shape {
    return new class implements Shape {
      apply(): void {
        Draw.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
      }
    }();
  }

  static circle(x: number, y: number, radius: number): Shape {
    return Draw.arc(x, y, radius, 0, Math.PI * 2);
  }

  static ellipse(
    x: number, y: number,
    radiusX: number, radiusY: number,
    rotation: number,
    startAngle = 0, endAngle: number = Math.PI * 2, anticlockwise?: boolean | undefined
  ): Shape {
    return new class implements Shape {
      apply(): void {
        Draw.context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
      }
    }();
  }

  static getCornerPoints(): CornerPoints {
    const transformationMatrix = Draw.context.getTransform().invertSelf();
    return new CornerPoints(
      new Point(0, 0).applyMatrix(transformationMatrix),
      new Point(Draw.canvas.width, 0).applyMatrix(transformationMatrix),
      new Point(Draw.canvas.width, Draw.canvas.height).applyMatrix(transformationMatrix),
      new Point(0, Draw.canvas.height).applyMatrix(transformationMatrix)
    );
  }

  static getMousePositionOnCanvas(x: number, y: number): Point {
    const boundsRect = Draw._canvas.getBoundingClientRect();
    const position = new Point(
      x - boundsRect.left,
      y - boundsRect.top
    );
    position.applyMatrix(Draw._context.getTransform().invertSelf());
    return position;
  }
}
