import './Leaderboard.css';

import { LeaderboardResponseItem } from 'api/types';
import React, { PureComponent } from 'react';
import { Image, Label, List, Menu } from 'semantic-ui-react';

import { LeaderboardServices } from './LeaderboardServices';
import { LeaderboardState } from './types';

type Props = Record<string, never>;

export class Leaderboard extends PureComponent<Props, Partial<LeaderboardState>> {
  services = new LeaderboardServices();

  constructor(props = {}) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    this.services.getLeaderboard().then((leaders) => {
      this.setState({
        leaders,
      });
    });
  }

  render(): JSX.Element {
    const { leaders } = this.state;
    return (
      <div className="leaderboard__top">
        <div className="leaderboard__top-bar">
          <Menu color="blue" inverted widths={3}>
            <Menu.Item name="All time" />
          </Menu>
        </div>
        <div className="leaderboard__list">
          <List divided verticalAlign="middle">
            {leaders?.map((item: LeaderboardResponseItem, index: number) => (
              <List.Item key={index}>
                <Label color="blue">{index + 1}</Label>
                <Image avatar src={item.data.avatar} />
                <List.Content>{item.data.login}</List.Content>
                <List.Content floated="right">
                  <Label color="blue">
                    Очки
                    <Label.Detail>{item.data.casablanca_score}</Label.Detail>
                  </Label>
                  <Label color="black">
                    Уровень
                    <Label.Detail>{item.data.level}</Label.Detail>
                  </Label>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    );
  }
}
