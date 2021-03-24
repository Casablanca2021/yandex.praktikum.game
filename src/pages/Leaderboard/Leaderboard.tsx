import React, { PureComponent } from 'react';
import { LeaderboardPage, Leaders } from 'pages/Leaderboard';
import {
  List,
  Menu,
  MenuItemProps,
  Image,
  Label,
} from 'semantic-ui-react';
import './Leaderboard.css';

class Leaderboard extends PureComponent<{}, Partial<LeaderboardPage>> {
  constructor(props = {}) {
    super(props);
    this.state = {
      activeItem: 'All time',
    };
  }

  componentDidMount(): void {
    const avatar = 'https://image.flaticon.com/icons/png/512/147/147144.png';
    this.setState({
      leaders: [
        {
          id: 1, name: 'Иванов Иван', points: 1000, avatar,
        },
        {
          id: 2, name: 'Сидоров Сидор', points: 500, avatar,
        },
        {
          id: 3, name: 'Матроскин Кот', points: 300, avatar,
        },
        {
          id: 4, name: 'Иванов Иван', points: 200, avatar,
        },
        {
          id: 5, name: 'Иванов Иван', points: 100, avatar,
        },
        {
          id: 6, name: 'Матроскин', points: 50, avatar,
        },
        {
          id: 7, name: 'Сидоров Сидор', points: 25, avatar,
        },
        {
          id: 8, name: 'Матроскин', points: 10, avatar,
        },
      ],
    });
  }

  handleItemClick = (e : React.MouseEvent<HTMLAnchorElement,
    MouseEvent>, data : MenuItemProps) : void => {
    const name = data.name || 'This week';
    const { leaders } = this.state;
    leaders?.splice(leaders.length - 2, leaders.length - 1);
    this.setState({
      activeItem: name,
      leaders,
    });
  }

  render() : JSX.Element {
    const { activeItem, leaders } = this.state;
    return (
      <div>
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

export default Leaderboard;
