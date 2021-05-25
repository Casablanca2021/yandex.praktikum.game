import './Game.css';

import b_ from 'b_';
import { t } from 'common';
import { ModalWindow } from 'components/ModalWindow';
import { GameProcess } from 'core';
import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';
import { Button } from 'semantic-ui-react';

type Props = {};

type State = {
  fullscreenMode: boolean;
  modalStatus: boolean;
};

interface Document extends HTMLDocument {
  mozPointerLockElement: any;
  webkitPointerLockElement: any;
}

interface Canvas extends HTMLCanvasElement {
  mozRequestPointerLock: any;
  webkitRequestPointerLock: any;
}

const b = b_.with('game');

export class Game extends PureComponent<Props, State> {
  canvasWidth = 800;

  canvasHeight = window.innerHeight;

  canvasRoad = React.createRef<HTMLCanvasElement>();

  gameProcess?: GameProcess;

  constructor(props = {}) {
    super(props);
    this.state = {
      fullscreenMode: false,
      modalStatus: false,
    };
  }

  componentDidMount(): void {
    const canvasRoad = this.canvasRoad?.current as HTMLCanvasElement;
    this.gameProcess = new GameProcess(this.canvasWidth, this.canvasHeight, canvasRoad);
    this.gameProcess.initGame();
    window.addEventListener('keyup', this.handleKeyUp);
    this.addPointerLock(canvasRoad);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  addPointerLock = (canvasElem: HTMLCanvasElement) => {
    canvasElem.requestPointerLock =
      canvasElem.requestPointerLock || (canvasElem as Canvas).mozRequestPointerLock || (canvasElem as Canvas).webkitRequestPointerLock;

    canvasElem.addEventListener('click', () => {
      if (!this.isPointerLockedElem()) {
        canvasElem.requestPointerLock();
      } else {
        document.exitPointerLock();
      }
    });

    const debounceMouseHandler = debounce(this.gameProcess?.handleMouseMove ?? (() => {}), 10);

    const pointerLockCallback = () => {
      const havePointerLock =
        'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

      if (!havePointerLock) {
        console.warn('Ваш браузер не поддерживает Pointer Lock');
        return;
      }

      if (this.gameProcess?.handleMouseMove) {
        if (this.isPointerLockedElem()) {
          document.addEventListener('mousemove', debounceMouseHandler, false);
        } else {
          document.removeEventListener('mousemove', debounceMouseHandler, false);
        }
      }
    };

    document.addEventListener('pointerlockchange', pointerLockCallback, false);
    document.addEventListener('mozpointerlockchange', pointerLockCallback, false);
    document.addEventListener('webkitpointerlockchange', pointerLockCallback, false);
  };

  isPointerLockedElem = (): boolean => {
    const canvasElem = this.canvasRoad?.current as HTMLCanvasElement;

    return (
      canvasElem === (document as Document).pointerLockElement ||
      canvasElem === (document as Document).mozPointerLockElement ||
      canvasElem === (document as Document).webkitPointerLockElement
    );
  };

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
      t('canсel')
    );
  }

  render(): JSX.Element {
    const { fullscreenMode } = this.state;
    const modal = this.renderModalWindow();
    return (
      <div className={b()}>
        {modal}
        <div id="form" className={b('form')}>
          <h1>{`${t('level')} 1`}</h1>
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
        </div>
      </div>
    );
  }
}
