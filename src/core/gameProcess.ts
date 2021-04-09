import { Road, Car } from 'core';
import { animate } from 'utils';

export class GameProcess {
    private canvasRoad : HTMLCanvasElement;

    private canvasWidth: number;

    private canvasHeight: number;

    private requestAnimationId = 0;

    road: Road;

    cars: Car[] = [];

    last = 0;

    // Кол-во кадров в секунду
    fps: number = 1000 / 120;

    constructor(
      canvasWidth: number,
      canvasHeight: number,
      canvasRoad: HTMLCanvasElement,
    ) {
      this.canvasHeight = canvasHeight;
      this.canvasWidth = canvasWidth;
      this.canvasRoad = canvasRoad;

      this.road = new Road(this.canvasHeight);

      this.cars.push(new Car({ min: 150, max: this.canvasWidth - 150 },
        { min: 0, max: this.canvasHeight }));
    }

    handleKeyUp = (event: KeyboardEvent) : void => {
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
    }

    // Старт игры
    startGame(): void {
      this.last = performance.now();
      this.update(performance.now());
      window.addEventListener('keydown', this.handleKeyUp);
    }

    // Остановка игры
    stopGame(): void {
      cancelAnimationFrame(this.requestAnimationId);
      window.removeEventListener('keydown', this.handleKeyUp);
    }

    // Перерисовка экрана
    private update(now: number): void {
      const delay = now - this.last;
      if (delay > this.fps) {
        this.last = now;
        this.draw();
      }
      this.requestAnimationId = requestAnimationFrame(this.update.bind(this));
    }

    draw = () : void => {
      const ctx = this.canvasRoad?.getContext('2d') as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.road.update();
      for (let i = 0; i < 2; i += 1) {
        ctx.drawImage(
          this.road.image,
          0,
          0,
          this.road.image.width,
          this.road.image.height,
          0,
          this.road.y - (this.road.height * i),
          this.canvasWidth,
          this.road.height,
        );
      }

      for (let i = 0; i < this.cars.length; i += 1) {
        ctx?.drawImage(
          this.cars[i].getImage,
          0,
          0,
          this.cars[i].getImage.width,
          this.cars[i].getImage.height,
          this.cars[i].getX,
          this.cars[i].getY,
          this.cars[i].getCarWidth,
          this.cars[i].getCarHeight,
        );
      }
    }

    initGame(): void {
      this.startGame();
      const el = document.getElementById('form');
      setTimeout(() => {
        // Показваем баннер в начале игры
        animate((timing) => timing,
          (progressOne) => {
            el?.style.setProperty('top', `${progressOne * 50}%`);
            el?.style.setProperty('opacity', `${progressOne}`);
            if (progressOne === 1) {
              setTimeout(() => {
                // Двигаем баннер вниз
                animate((timing) => timing,
                  (progressTwo) => {
                    el?.style.setProperty('top', `${50 + progressTwo * 50}%`);
                    el?.style.setProperty('opacity', `${1 - progressTwo}`);
                    if (progressTwo === 1) {
                      // Убираем баннер
                      el?.style.setProperty('display', 'none');
                      this.cars[0].toUp();
                    }
                  }, 500);
              }, 2000);
            }
          }, 1500);
      }, 1000);
    }
}
