import logo from 'assets/Road.png';
import car from 'assets/car.png';
import { animate } from 'utils';

export class Road {
  private y = 0;

  private speed = 30;

  private height: number;

  private width: number;

  private image = new Image();

  private ctx: CanvasRenderingContext2D | null | undefined;

  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
  }

  init(ctx: CanvasRenderingContext2D): void {
    this.image.onload = () => {
      this.ctx = ctx;
      this.draw();
    }
    this.image.src = logo;
  }

  draw(): void {
    this.y += this.speed;

    if (this.y > this.height) { this.y = this.speed; }

    this.ctx?.clearRect(0, 0, this.width, this.height);

    //Цикл для отрисовки дороги 
    for (let i = 0; i < 2; i += 1) {
      this.ctx?.drawImage(
        this.image,
        0,
        0,
        this.image.width,
        this.image.height,
        0,
        this.y - (this.height * i),
        this.width,
        this.height,
      );
    }
  }
}

export class Car {

  private height = 0;
  private width = 0;
  private carHeight = 150;
  private carWidth = 100;
  private y = 0;
  private x = 0;
  private maxHeight = 0;
  private maxWidth = 0;
  private image = new Image();
  private ctx: CanvasRenderingContext2D | null | undefined;

  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.maxHeight = this.height - this.carHeight;
    this.maxWidth = this.width - this.carWidth;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.toRight();
      }
      if (e.key === 'ArrowLeft') {
        this.toLeft();
      }
      if (e.key === 'ArrowUp') {
        this.toUp();
      }
      if (e.key === 'ArrowDown') {
        this.toDown();
      }
    });
  }

  private setX = (value: number) => {
    let x = this.x + value;
    if (x < 0) {
      x = 0;
    }

    if (x > this.width - this.carWidth) {
      x = this.maxWidth;
    }

    this.x = x;
  }

  private setY = (value: number) => {
    let y = this.y + value;
    if (y < 0) {
      y = 0;
    }

    if (y > this.height - this.carHeight) {
      y = this.maxHeight;
    }

    this.y = y;
  }

  toLeft() {
    animate((time: number) => time + 5, this.setX, 300, -1)
  }

  toRight() {
    animate((time: number) => time + 5, this.setX, 300, 1)
  }

  toUp() {
    animate((time: number) => time + 5, this.setY, 300, -1)
  }

  toDown() {
    animate((time: number) => time + 5, this.setY, 300, 1)
  }

  init(ctx: CanvasRenderingContext2D): void {
    this.x = this.width/2;
    this.y = this.height;
    this.image.onload = () => {
      this.ctx = ctx;
      this.draw();
    }
    this.image.src = car;
  }

  draw(): void {
    this.ctx?.clearRect(0, 0, this.width, this.height);
    this.ctx?.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.x,
      this.y,
      this.carWidth,
      this.carHeight,
    );
  }
}
