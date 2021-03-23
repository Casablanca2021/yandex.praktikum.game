/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import { Button, Form, Image } from 'semantic-ui-react';
import { profileForm } from 'components/Profile';

import './Profile.css';

class Profile extends PureComponent<{}, Partial<profileForm>> {
  fileInput: React.RefObject<HTMLInputElement>;

  constructor(props = {}) {
    super(props);
    this.state = {
      profile: {},
      isError: {},
    };
    this.fileInput = React.createRef();
  }

  saveChanges = (): void => {
    const { state } = this;
    console.log(state.profile);
  }

  handleUserInput = (e : React.ChangeEvent<HTMLInputElement>): void => {
    const { profile } = this.state;
    const { id, value } = e.target;
    this.setState({
      profile: { ...profile, [id]: value },
    });
  }

  onBlur = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    const { isError } = this.state;
    const { id, value } = e.target;
    this.setState({ isError: { ...isError, [id]: !(value.length > 0) } });
  }

  onFocus = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    const { id } = e.target;
    const { isError } = this.state;
    this.setState({ isError: { ...isError, [id]: false } });
  }

  handleUserAvatar = (e : React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files?.length > 0) {
      const avatar = e.target.files[0];
      console.log(avatar);
    }
  }

  render() : JSX.Element {
    const { state } = this;
    const src = state.profile?.avatar || 'https://more-show.ru/upload/not-available.png';
    return (
      <div className="profile">
        <Form id="form">
          <div className="profile__avatar">
            <Image onClick={() => { this.fileInput.current?.click(); }} className="profile__avatar-image" src={src} size="medium" bordered />
            <input style={{ display: 'none' }} type="file" ref={this.fileInput} onChange={this.handleUserAvatar} />
            <h3>{state.profile?.display_name}</h3>
          </div>
          <Form.Input
            id="display_name"
            label="Ник"
            fluid
            onChange={this.handleUserInput}
            value={state.profile?.display_name || ''}
            error={state.isError?.display_name}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Form.Input
            id="second_name"
            label="Фамилия"
            fluid
            value={state.profile?.second_name || ''}
            onChange={this.handleUserInput}
            error={state.isError?.second_name}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Form.Input
            id="first_name"
            label="Имя"
            fluid
            onChange={this.handleUserInput}
            value={state.profile?.first_name || ''}
            error={state.isError?.first_name}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Form.Input
            id="login"
            label="Логин"
            fluid
            onChange={this.handleUserInput}
            value={state.profile?.login || ''}
            error={state.isError?.login}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Form.Input
            id="email"
            label="Электронный адрес"
            fluid
            onChange={this.handleUserInput}
            value={state.profile?.email || ''}
            error={state.isError?.email}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Form.Input
            id="phone"
            label="Телефон"
            fluid
            onChange={this.handleUserInput}
            value={state.profile?.phone || ''}
            error={state.isError?.phone}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Button onClick={this.saveChanges} color="green" type="button">Сохранить</Button>
          <Button type="button">Отмена</Button>
        </Form>
      </div>

    );
  }
}

export default Profile;
