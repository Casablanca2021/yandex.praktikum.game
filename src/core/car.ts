import car from 'assets/car.png';
import { animate } from 'utils';

type Range = {
  min: number,
  max: number
}

export class Car {
  // Разаменр автомобиля
  private carHeight = 140;

  private carWidth = 100;

  // Координаты расположения автомобиля
  private y = 0;

  private x = 0;

  // Максимальные значения для перемещения автомобиля
  private rangeX : Range;

  private rangeY : Range;

  // Сам автомобиль (фотография)
  private image = new Image();

  constructor(rangeX: Range, rangeY: Range) {
    this.image.src = car;
    this.rangeY = rangeY;
    this.rangeX = rangeX;
    this.x = this.rangeX.min;
    this.y = this.rangeY.max;
  }

  get getImage() : HTMLImageElement {
    return this.image;
  }

  get getX() : number {
    return this.x;
  }

  get getY() : number {
    return this.y;
  }

  get getCarHeight() : number {
    return this.carHeight;
  }

  get getCarWidth() : number {
    return this.carWidth;
  }

  // Изменеие положения автомобиля по оси X
  private setX = (value: number): void => {
    let x = this.x + value;
    if (x < this.rangeX.min) {
      x = this.rangeX.min;
    }

    if (x > this.rangeX.max - this.carWidth) {
      x = this.rangeX.max - this.carWidth;
    }

    this.x = x;
  }

  // Изменеие положения автомобиля по оси Y
  private setY = (value: number): void => {
    let y = this.y + value;
    if (y < this.rangeY.min) {
      y = this.rangeY.min;
    }

    if (y > this.rangeY.max - this.carHeight) {
      y = this.rangeY.max - this.carHeight;
    }

    this.y = y;
  }

  // Методы для перемещения автомобиля
  toLeft = (): void => {
    animate((time: number) => time + 6, this.setX, 300, -1);
  }

  toRight = (): void => {
    animate((time: number) => time + 6, this.setX, 300, 1);
  }

  toUp = (): void => {
    animate((time: number) => time + 6, this.setY, 300, -1);
  }

  toDown = (): void => {
    animate((time: number) => time + 6, this.setY, 300, 1);
  }
}
