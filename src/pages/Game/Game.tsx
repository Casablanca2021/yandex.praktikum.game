import './Game.css';

import b_ from 'b_';
import { t } from 'common';
import { ModalWindow } from 'components/ModalWindow';
import { GameProcess } from 'core';
import React, { PureComponent } from 'react';
import { Button } from 'semantic-ui-react';
import { animate } from 'utils';

type Props = Record<string, never>;

type State = {
  fullscreenMode: boolean;
  modalStatus: boolean;
  alertText: string;
  level: number;
  score: number;
  restartModalStatus: boolean;
};

const b = b_.with('game');

export class Game extends PureComponent<Props, State> {
  canvasWidth = 800;

  canvasHeight = window.innerHeight;

  canvasRoad = React.createRef<HTMLCanvasElement>();

  gameProcess?: GameProcess;

  private readonly formRef: React.RefObject<HTMLDivElement>;

  constructor(props = {}) {
    super(props);
    this.state = {
      alertText: '',
      fullscreenMode: false,
      modalStatus: false,
      level: 0,
      score: 0,
      restartModalStatus: false,
    };
    this.formRef = React.createRef();
  }

  componentDidMount(): void {
    const canvasRoad = this.canvasRoad?.current as HTMLCanvasElement;
    this.gameProcess = new GameProcess(
      this.canvasWidth,
      this.canvasHeight,
      canvasRoad,
      this.alert.bind(this),
      this.setInfo.bind(this),
      this.restartModal.bind(this)
    );
    this.gameProcess.initGame();
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  setInfo(score: number, level: number): void {
    this.setState({
      score,
      level,
    });
  }

  handleKeyUp = (event: KeyboardEvent): void => {
    if (event.code === 'Escape') {
      this.exit();
    }
  };

  exit = (): void => {
    this.gameProcess?.stopGame();
    this.setState({
      modalStatus: true,
    });
  };

  toggleFullScreen = (): void => {
    if (!document.fullscreenElement) {
      this.setState({
        fullscreenMode: true,
      });
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      this.setState({
        fullscreenMode: false,
      });
      document.exitFullscreen();
    }
  };

  alert(text: string, hide = true): Promise<void> | undefined {
    this.setState({ alertText: text });

    const form = this.formRef.current;

    if (!form) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return new Promise<void>((resolve) => {
      form.style.setProperty('display', 'flex');
      animate(
        (timing) => timing,
        (progressOne) => {
          form.style.setProperty('top', `${progressOne * 50}%`);
          form.style.setProperty('opacity', `${progressOne}`);
          if (progressOne === 1) {
            if (!hide) return;

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

                    resolve();
                  }
                },
                500
              );
            }, 500);
          }
        },
        1000
      );
    });
  }

  restartModal(): void {
    this.setState({
      restartModalStatus: true,
    });
  }

  renderModalWindow(): JSX.Element {
    const { modalStatus } = this.state;
    return ModalWindow(
      modalStatus,
      t('quitGame'),
      t('closeMessage'),
      () => {
        this.setState({
          modalStatus: false,
        });
        this.gameProcess?.startGame();
      },
      () => {
        console.log('Конец');
      },
      t('ok'),
      t('cancel')
    );
  }

  renderRestartModal(): JSX.Element {
    const { restartModalStatus, score } = this.state;
    return ModalWindow(
      restartModalStatus,
      t('gameOver'),
      `${t('gameOverScore')} ${score}`,
      undefined,
      () => {
        this.setState({
          restartModalStatus: false,
        });
        this.gameProcess?.restartGame();
      },
      t('restart')
    );
  }

  render(): JSX.Element {
    const { fullscreenMode, alertText, level, score } = this.state;
    const modal = this.renderModalWindow();
    return (
      <div className={b()}>
        {modal}
        {this.renderRestartModal()}
        <div ref={this.formRef} className={b('alert')}>
          <h1>{alertText}</h1>
        </div>
        <div className={b('column', { position: 'left' })} />
        <div className={b('column', { position: 'center' })}>
          <canvas className={b('road')} id="road" ref={this.canvasRoad} width={this.canvasWidth} height={this.canvasHeight} />
        </div>
        <div className={b('column', { position: 'right' })}>
          <div className={b('bar', { position: 'top' })}>
            <Button color="blue" onClick={this.toggleFullScreen}>
              {t(fullscreenMode ? 'normalScreen' : 'fullScreen')}
            </Button>
            <Button color="red" onClick={this.exit}>
              {t('exit')}
            </Button>
          </div>
          <div className={b('info')}>
            <div className={b('info-item')}>Level: {level}</div>
            <div className={b('info-item', { size: 'small' })}>Score: {score}</div>
          </div>
        </div>
      </div>
    );
  }
}
