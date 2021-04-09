import React, { PureComponent } from 'react';
import { t } from 'common';
import { ModalWindow } from 'components/ModalWindow';
import { GameProcess } from 'core';
import { Button } from 'semantic-ui-react';
import './Game.css';

type Props = {

}

export class Game extends PureComponent<Props, { modalStatus: boolean }> {
  canvasWidth = 800;

  canvasHeight = window.innerHeight;

  canvasRoad = React.createRef<HTMLCanvasElement>();

  gameProcess?: GameProcess;

  constructor(props = {}) {
    super(props);
    this.state = {
      modalStatus: false,
    };
  }

  componentDidMount(): void {
    const canvasRoad = this.canvasRoad?.current as HTMLCanvasElement;
    this.gameProcess = new GameProcess(this.canvasWidth, this.canvasHeight, canvasRoad);
    this.gameProcess.initGame();
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount(): void {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp = (event: KeyboardEvent) : void => {
    if (event.code === 'Escape') {
      this.exit();
    }
  }

  exit = (): void => {
    this.gameProcess?.stopGame();
    this.setState({
      modalStatus: true,
    });
  }

  renderModalWindow(): JSX.Element {
    const { modalStatus } = this.state;
    return ModalWindow(modalStatus,
      t('quitGame'),
      t('closeMessage'),
      () => {
        this.setState({
          modalStatus: false,
        });
        this.gameProcess?.startGame();
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
        <div className="game__left-bar" />
        <div className="game__center-bar">
          <canvas className="game__road" id="road" ref={this.canvasRoad} width={this.canvasWidth} height={this.canvasHeight} />
        </div>
        <div className="game__right-bar">
          <div className="game__top-bar">
            <Button color="blue" onClick={this.exit}>{t('exit')}</Button>
          </div>
        </div>
      </div>
    );
  }
}
