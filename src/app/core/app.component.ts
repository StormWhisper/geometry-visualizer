import {Draw} from '../classes/draw/draw';
import {Line} from '../classes/geometry/line';
import {Utils} from '../classes/utils';
import {Vector} from '../classes/geometry/vector';
import {Circle} from '../classes/geometry/circle';
import {Segment} from '../classes/geometry/segment';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas')
  private canvasElementRef!: ElementRef;
  @ViewChild('textarea')
  private textareaElementRef!: ElementRef;
  textarea!: HTMLTextAreaElement;

  mouseLx = -100;
  mouseLy = 0;
  mouseMx = 0;
  mouseMy = 0;
  mouseRx = 100;
  mouseRy = 0;

  ngAfterViewInit(): void {
    Draw.setCanvas(this.canvasElementRef.nativeElement);
    Draw.canvas.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    Draw.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    Draw.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    Draw.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    Draw.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    Draw.canvas.addEventListener('contextmenu', Utils.preventDefaultBehaviour.bind(this));

    this.textarea = this.textareaElementRef.nativeElement;
    this.textarea.focus();
    this.textarea.value = Utils.functionToString(() => {
      // Do not remove this object
      const S = {
        Circle,
        Line,
        Segment,
        Vector,
        mouseLx: this.mouseLx,
        mouseLy: this.mouseLy,
        mouseMx: this.mouseMx,
        mouseMy: this.mouseMy,
        mouseRx: this.mouseRx,
        mouseRy: this.mouseRy
      };
      // Use it's fields in your script below
      // Use break; to stop script evaluation
      // \n
      const point1 = new S.Vector(S.mouseLx, S.mouseLy);
      const point2 = new S.Vector(S.mouseRx, S.mouseRy);
      const line = new S.Line().set(point1, point2);
      const circle = new S.Circle().set(point1, S.Vector.getDistance(point1, point2));
      // \n
      line.draw();
      circle.draw();
      point1.drawPoint();
      point2.drawPoint('red');
    });

    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
  }

  onResize(): void {
    Draw.canvas.width = this.textarea.clientWidth;
    Draw.canvas.width -= Draw.canvas.width % 2;
    Draw.canvas.height = this.textarea.clientHeight;
    Draw.canvas.height -= Draw.canvas.height % 2;
    Draw.context.setTransform(1, 0, 0, 1, Draw.canvas.width / 2, Draw.canvas.height / 2);
    // Draw.context.setTransform(0.866, -0.5, 0.866, 0.5, Draw.canvas.width / 2, Draw.canvas.height / 2);

    this.update();
  }

  update(): void {
    Draw.fill(Draw.canvasBorders(), Draw.defaultBackgroundStyle);
    const cornerPoints = Draw.getCornerPoints();
    const xAxis = new Segment().set(cornerPoints.farthestLeft, 0, cornerPoints.farthestRight - 1, 0);
    xAxis.drawVector('lightblue', 2);
    const yAxis = new Segment().set(0, cornerPoints.farthestTop, 0, cornerPoints.farthestBottom - 1);
    yAxis.drawVector('lightblue', 2);

    const script = `do {${this.textarea.value}} while (false);`;
    // tslint:disable-next-line:no-eval
    eval(script);

    Draw.stroke(Draw.canvasBorders());
  }

  onMouseEnter(): void {

  }

  onMouseDown(e: MouseEvent): void {
    const mousePosition = Draw.getMousePositionOnCanvas(e.clientX, e.clientY);

    this.onMouseMove(e);
  }

  onMouseMove(e: MouseEvent): void {
    const mousePosition = Draw.getMousePositionOnCanvas(e.clientX, e.clientY);
    // tslint:disable:no-bitwise
    if ((e.buttons & 0b001) !== 0) {
      this.mouseLx = mousePosition.x;
      this.mouseLy = mousePosition.y;
    }
    if ((e.buttons & 0b010) !== 0) {
      this.mouseRx = mousePosition.x;
      this.mouseRy = mousePosition.y;
    }
    if ((e.buttons & 0b100) !== 0) {
      this.mouseMx = mousePosition.x;
      this.mouseMy = mousePosition.y;
    }
    if ((e.buttons & 0b111) !== 0) {
      this.update();
    }
    // tslint:enable:no-bitwise
  }

  onMouseUp(e: MouseEvent): void {
    const mousePosition = Draw.getMousePositionOnCanvas(e.clientX, e.clientY);
  }

  onMouseLeave(): void {

  }
}
