import React, { PureComponent } from 'react';
import {
  List,
  Menu,
  MenuItemProps,
  Image,
  Label,
} from 'semantic-ui-react';
import { LeaderboardState, Leaders } from './types';
import { LeaderboardServices } from './LeaderboardServices';
import './Leaderboard.css';

type ItemClickEvent = React.MouseEvent<HTMLAnchorElement, MouseEvent>;
type Props = {

}

export class Leaderboard extends PureComponent<Props, Partial<LeaderboardState>> {
  services = new LeaderboardServices();

  constructor(props = {}) {
    super(props);
    this.state = {
      activeItem: 'All time',
    };
  }

  componentDidMount(): void {
    this.services.getLeaderboard('All time')
      .then((leaders) => {
        this.setState({
          leaders,
        });
      });
  }

  handleItemClick = (e : ItemClickEvent, data : MenuItemProps) : void => {
    const name = data.name as 'This week' | 'All time' | 'Last week' || 'This week';

    this.services.getLeaderboard(name)
      .then((leaders) => {
        this.setState({
          leaders,
        });
      });
  }

  render() : JSX.Element {
    const { activeItem, leaders } = this.state;
    return (
      <div className="leaderboard__top">
        <div className="leaderboard__top-bar">
          <Menu color="blue" inverted widths={3}>
            <Menu.Item
              name="All time"
              active={activeItem === 'All time'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="This week"
              active={activeItem === 'This week'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Last week"
              active={activeItem === 'Last week'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </div>
        <div className="leaderboard__list">
          <List divided verticalAlign="middle">
            {
              leaders?.map((leader : Leaders, index: number) => (
                <List.Item key={leader.id}>
                  <Label color="blue">{index + 1}</Label>
                  <Image avatar src={leader.avatar} />
                  <List.Content>{leader.name}</List.Content>
                  <List.Content floated="right">
                    <Label color="blue" as="a">
                      Очки
                      <Label.Detail>{leader.points}</Label.Detail>
                    </Label>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </div>
      </div>
    );
  }
}
