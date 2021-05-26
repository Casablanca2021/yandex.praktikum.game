import car from 'assets/car.png';
import userCarcar from 'assets/usercar.png';
import { Car, Range, Road } from 'core';
import { animate, getRandomIntInclusive } from 'utils';

export class GameProcess {
  private canvasRoad: HTMLCanvasElement;

  private canvasWidth: number;

  private canvasHeight: number;

  private requestAnimationId = 0;

  private curb = 150;

  private scale = 0.8;

  road: Road;

  cars: Car[] = [];

  last = 0;

  carGenerationInterval = 0;

  rangeX: Range;

  rangeY: Range;

  // Кол-во кадров в секунду
  fps: number = 1000 / 120;

  constructor(canvasWidth: number, canvasHeight: number, canvasRoad: HTMLCanvasElement) {
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.canvasRoad = canvasRoad;

    this.road = new Road(this.canvasHeight);

    this.rangeX = { min: this.curb, max: this.canvasWidth - this.curb };
    this.rangeY = { min: 0, max: this.canvasHeight };
  }

  handleKeyUp = (event: KeyboardEvent): void => {
    const userCar = this.cars[0];
    // Перемещение автомобиля по оси X
    if (event.key === 'ArrowRight') {
      userCar.toRight();
    }
    if (event.key === 'ArrowLeft') {
      userCar.toLeft();
    }
    // Перемещение автомобиля по оси Y
    if (event.key === 'ArrowUp') {
      userCar.toUp();
    }
    if (event.key === 'ArrowDown') {
      userCar.toDown();
    }
  };

  handleMouseMove = (event: MouseEvent): void => {
    const userCar = this.cars[0];

    const x = event.movementX;
    const y = event.movementY;

    if (Math.abs(x) > Math.abs(y)) {
      // Перемещение автомобиля по оси X
      if (x > 0) {
        userCar.toRight();
      } else if (x < 0) {
        userCar.toLeft();
      }
    } else {
      // Перемещение автомобиля по оси Y
      if (y < 0) {
        userCar.toUp();
      } else if (y > 0) {
        userCar.toDown();
      }
    }
  };

  // Генерация автомобилей
  generateCar = (now: number): void => {
    const delay = now - this.carGenerationInterval;
    const speed = 5;

    // Добавляем машину
    if (delay > 1500) {
      this.cars.push(
        new Car(
          this.rangeX,
          this.rangeY,
          getRandomIntInclusive(this.rangeX.min, this.rangeX.max - this.curb),
          this.rangeY.min - this.curb,
          speed,
          car,
          this.scale
        )
      );
      this.carGenerationInterval = now;
    }
  };

  // Старт игры
  startGame(): void {
    const now = performance.now();
    this.last = now;
    this.carGenerationInterval = now;
    this.update(now);
    window.addEventListener('keydown', this.handleKeyUp);
  }

  // Остановка игры
  stopGame = (): void => {
    cancelAnimationFrame(this.requestAnimationId);
    window.removeEventListener('keydown', this.handleKeyUp);
  };

  // Перерисовка экрана
  private update = (now: number): void => {
    const delay = now - this.last;
    if (delay > this.fps) {
      this.generateCar(now);
      this.draw();
      this.last = now;
    }
    this.requestAnimationId = requestAnimationFrame(this.update);
  };

  // Рисуем дорогу
  drawRoad = (ctx: CanvasRenderingContext2D): void => {
    this.road.update();
    for (let i = 0; i < 2; i += 1) {
      ctx.drawImage(
        this.road.image,
        0,
        0,
        this.road.image.width,
        this.road.image.height,
        0,
        this.road.y - this.road.height * i,
        this.canvasWidth,
        this.road.height
      );
    }
  };

  // Рисуем автомобили
  drawCars = (ctx: CanvasRenderingContext2D): void => {
    for (let i = 0; i < this.cars.length; i += 1) {
      ctx.drawImage(
        this.cars[i].getImage,
        0,
        0,
        this.cars[i].getImage.width,
        this.cars[i].getImage.height,
        this.cars[i].getX,
        this.cars[i].getY,
        this.cars[i].getImage.width * this.scale,
        this.cars[i].getImage.height * this.scale
      );
    }
  };

  // Заполняем холст
  draw = (): void => {
    const ctx = this.canvasRoad?.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.drawRoad(ctx);
    this.drawCars(ctx);

    for (let i = 1; i < this.cars.length; i += 1) {
      this.cars[i].toDown();

      // Перехватываем столкновения
      const value = this.cars[0].collide(this.cars[i]);
      if (value) {
        alert('Game Over');
      }

      // Удаляем машину которая пропала из виду
      if (this.cars[i].getY > this.rangeY.max) {
        this.cars[i].cancelAction();
        this.cars.splice(i, 1);
      }
    }
  };

  initGame(): void {
    this.cars = [];

    // Машина пользователя
    const speed = 6;
    this.cars.push(new Car(this.rangeX, this.rangeY, this.rangeX.max / 2, this.rangeY.max, speed, userCarcar, this.scale, true));

    this.startGame();
    const form = document.getElementById('form');

    if (!form) {
      return;
    }

    // Показваем баннер в начале игры
    form.style.setProperty('display', 'flex');
    animate(
      (timing) => timing,
      (progressOne) => {
        form.style.setProperty('top', `${progressOne * 50}%`);
        form.style.setProperty('opacity', `${progressOne}`);
        if (progressOne === 1) {
          setTimeout(() => {
            // Двигаем баннер вниз
            animate(
              (timing) => timing,
              (progressTwo) => {
                form.style.setProperty('top', `${50 + progressTwo * 50}%`);
                form.style.setProperty('opacity', `${1 - progressTwo}`);
                if (progressTwo === 1) {
                  // Убираем баннер
                  form.style.setProperty('display', 'none');
                  this.cars[0].toUp();
                }
              },
              500
            );
          }, 500);
        }
      },
      1000
    );
  }
}
