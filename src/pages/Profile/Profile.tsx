import React, { PureComponent } from 'react';
import { Button, Form, Image } from 'semantic-ui-react';
import { ProfileForm } from 'pages/Profile';
import { t } from 'common/dictionary';
import './Profile.css';

type Props = {

};

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

class Profile extends PureComponent<Props, Partial<ProfileForm>> {
  fileInput: React.RefObject<HTMLInputElement>;

  constructor(props = {}) {
    super(props);
    this.state = {
      profile: {},
      errors: {},
    };
    this.fileInput = React.createRef();
  }

  saveChanges = (): void => {
    const { state } = this;
    console.log(state.profile);
  }

  handleUserInput = (e : InputChangeEvent): void => {
    const { id, value } = e.target;
    this.setState((state) => ({
      profile: { ...state.profile, [id]: value },
    }));
  }

  onBlur = (e : InputChangeEvent) : void => {
    const { id, value } = e.target;
    this.setState((state) => ({ errors: { ...state.errors, [id]: !(value.length > 0) } }));
  }

  onFocus = (e : InputChangeEvent) : void => {
    const { id } = e.target;
    this.setState((state) => ({ errors: { ...state.errors, [id]: false } }));
  }

  handleUserAvatar = (e : InputChangeEvent): void => {
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
            label={t('display_name')}
            fluid
            onChange={this.handleUserInput}
            value={state.profile?.display_name || ''}
            error={state.errors?.display_name}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Form.Input
            id="second_name"
            label={t('second_name')}
            fluid
            value={state.profile?.second_name || ''}
            onChange={this.handleUserInput}
            error={state.errors?.second_name}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Form.Input
            id="first_name"
            label={t('first_name')}
            fluid
            onChange={this.handleUserInput}
            value={state.profile?.first_name || ''}
            error={state.errors?.first_name}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Form.Input
            id="login"
            label={t('login')}
            fluid
            onChange={this.handleUserInput}
            value={state.profile?.login || ''}
            error={state.errors?.login}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Form.Input
            id="email"
            label={t('email')}
            fluid
            onChange={this.handleUserInput}
            value={state.profile?.email || ''}
            error={state.errors?.email}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Form.Input
            id="phone"
            label={t('phone')}
            fluid
            onChange={this.handleUserInput}
            value={state.profile?.phone || ''}
            error={state.errors?.phone}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          <Button onClick={this.saveChanges} color="blue" type="button">{t('saveButton')}</Button>
          <Button type="button">{t('cancelButton')}</Button>
        </Form>
      </div>

    );
  }
}

export default Profile;
