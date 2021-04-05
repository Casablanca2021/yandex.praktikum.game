import React, { PureComponent } from 'react';
import { animate } from 'utils';
import { t } from 'common';
import { ModalWindow } from 'components/ModalWindow';
import { Road, Car } from './types';
import './Game.css';

type Props = {

}

export class Game extends PureComponent<Props, { modalStatus: boolean }> {
  canvasWidth = 500;

  canvasRoad = React.createRef<HTMLCanvasElement>();

  canvasCar = React.createRef<HTMLCanvasElement>();

  requestAnimationId = 0;

  height = window.innerHeight;

  road: Road;

  car: Car;

  last = 0;

  fps: number = 1000 / 120;

  constructor(props = {}) {
    super(props);
    this.road = new Road(this.canvasWidth, this.height);
    this.car = new Car(this.canvasWidth, this.height);
    this.state = {
      modalStatus: false,
    };
  }

  componentDidMount(): void {
    this.initGame();
    window.addEventListener('keyup', this.exit);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.exit);
  }

  exit = (key : KeyboardEvent) => {
    if (key.code === 'Escape') {
      this.stopGame();
      this.setState({
        modalStatus: true,
      });
    }
  }

  private update(now: number): void {
    const delay = now - this.last;
    if (delay > this.fps) {
      this.last = now;
      this.road.draw();
      this.car.draw();
    }
    this.requestAnimationId = requestAnimationFrame(this.update.bind(this));
  }

  startGame(): void {
    this.last = performance.now();
    this.update(performance.now());
  }

  stopGame(): void {
    cancelAnimationFrame(this.requestAnimationId);
  }

  initGame(): void {
    const ctxRoad = this.canvasRoad.current?.getContext('2d') as CanvasRenderingContext2D;
    const ctxCar = this.canvasCar.current?.getContext('2d') as CanvasRenderingContext2D;
    this.road.init(ctxRoad);
    this.car.init(ctxCar);
    this.startGame();
    const el = document.getElementById('form');
    setTimeout(() => {
      animate((timing) => timing,
        (progressOne) => {
          el?.style.setProperty('top', `${progressOne * 50}%`);
          el?.style.setProperty('opacity', `${progressOne}`);
          if (progressOne === 1) {
            setTimeout(() => {
              animate((timing) => timing,
                (progressTwo) => {
                  el?.style.setProperty('top', `${50 + progressTwo * 50}%`);
                  el?.style.setProperty('opacity', `${1 - progressTwo}`);
                  if (progressTwo === 1) {
                    el?.style.setProperty('display', 'none');
                    this.car.toUp.bind(this.car)();
                  }
                }, 500);
            }, 2000);
          }
        }, 1500);
    }, 1000);
  }

  renderModalWindow() :JSX.Element {
    const { modalStatus } = this.state;
    return ModalWindow(modalStatus,
      t('quitGame'),
      t('closeMessage'),
      () => {
        this.setState({
          modalStatus: false,
        });
        this.startGame();
      }, () => {
        console.log('Конец');
      }, t('ok'), t('canсel'));
  }

  render(): JSX.Element {
    const modal = this.renderModalWindow();
    return (
      <div className="game">
        {modal}
        <div id="form" className="game__form">
          <h1>{`${t('level')} 1`}</h1>
        </div>
        <canvas className="game__road" id="road" ref={this.canvasRoad} width={this.canvasWidth} height={this.height} />
        <canvas className="game__car" id="car" ref={this.canvasCar} width={this.canvasWidth} height={this.height} />
      </div>
    );
  }
}
