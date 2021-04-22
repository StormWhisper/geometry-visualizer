import {Point} from './point';

export class CornerPoints {
  readonly topLeft: Point;
  readonly topRight: Point;
  readonly bottomRight: Point;
  readonly bottomLeft: Point;

  constructor(
    topLeft: Point,
    topRight: Point,
    bottomRight: Point,
    bottomLeft: Point
  ) {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomRight = bottomRight;
    this.bottomLeft = bottomLeft;
  }

  get farthestLeft(): number {
    return Math.min(this.topLeft.x, this.bottomLeft.x);
  }

  get farthestRight(): number {
    return Math.max(this.topRight.x, this.bottomRight.x);
  }

  get farthestTop(): number {
    return Math.min(this.topLeft.y, this.topRight.y);
  }

  get farthestBottom(): number {
    return Math.max(this.bottomLeft.y, this.bottomRight.y);
  }
}
