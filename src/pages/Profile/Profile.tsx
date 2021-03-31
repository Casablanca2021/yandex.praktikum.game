import React, { PureComponent } from 'react';
import { t, InputChangeEvent } from 'common';
import {
  Button, Form, Image, Label,
} from 'semantic-ui-react';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateLoginAndPassword,
} from 'utils';
import { User } from 'api/user';
import { ProfileForm, Notification } from './types';
import './Profile.css';

type Props = {

};

export class Profile extends PureComponent<Props, ProfileForm> {
  fileInput: React.RefObject<HTMLInputElement>;

  constructor(props = {}) {
    super(props);
    this.state = {
      profile: {},
      errors: {},
      notification: null,
    };
    this.fileInput = React.createRef();
  }

  componentDidMount(): void {
    User.getUser().then((profile) => {
      this.setState({
        profile: { ...profile, avatar: this.getImageUrl(profile.avatar) },
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  getImageUrl = (url: string): string | undefined => (url ? `https://ya-praktikum.tech//api/v2/resources${url}` : undefined)

  setNotification = (notification: Notification | null): void => {
    this.setState({
      notification,
    });
  }

  saveChanges = (): void => {
    this.setNotification(null);
    const { profile, errors } = this.state;
    if (!Object.values(errors).some((value) => value)) {
      User.changeUser(profile).then(() => {
        this.setNotification({ message: t('changesSaved'), color: 'green' });
      }).catch(() => {
        this.setNotification({ message: t('error'), color: 'red' });
      });
    } else {
      this.setNotification({ message: t('requiredFields'), color: 'red' });
    }
  };

  handleUserInput = (e: InputChangeEvent): void => {
    const { id, value } = e.target;
    this.setState((state) => ({
      profile: { ...state.profile, [id]: value },
    }));
  };

  onBlur = (isValid: boolean) => (e: InputChangeEvent): void => {
    const { id } = e.target;
    this.setState((state) => ({ errors: { ...state.errors, [id]: isValid } }));
  };

  onFocus = (e: InputChangeEvent): void => {
    const { id } = e.target;
    this.setState((state) => ({ errors: { ...state.errors, [id]: false } }));
  };

  handleUserAvatar = (e: InputChangeEvent): void => {
    if (e.target.files && e.target.files?.length > 0) {
      const img = e.target.files[0];
      const formData = new FormData();
      formData.append('avatar', img, img.name);
      User.changeAvatar(formData).then((profile) => {
        const avatar = this.getImageUrl(profile.avatar);
        this.setState((state) => ({ profile: { ...state.profile, avatar } }));
        this.setNotification({ message: t('avatarChanged'), color: 'green' });
      });
    }
  };

  render(): JSX.Element {
    const { profile, errors, notification } = this.state;
    const avatarUrl = profile?.avatar || 'https://more-show.ru/upload/not-available.png';
    return (
      <div className="profile">
        <div className="profile__form">
          <Form id="form">
            <div className="profile__avatar">
              <Image
                onClick={() => {
                  this.fileInput.current?.click();
                }}
                className="profile__avatar-image"
                src={avatarUrl}
                size="medium"
                bordered
              />
              <input style={{ display: 'none' }} type="file" ref={this.fileInput} onChange={this.handleUserAvatar} />
              <h3>{profile?.display_name}</h3>
            </div>
            <Form.Input
              id="display_name"
              label={t('display_name')}
              fluid
              onChange={this.handleUserInput}
              value={profile?.display_name || ''}
              error={errors?.display_name}
              onBlur={this.onBlur(validateName(profile?.display_name || ''))}
              onFocus={this.onFocus}
            />
            <Form.Input
              id="second_name"
              label={t('second_name')}
              fluid
              value={profile?.second_name || ''}
              onChange={this.handleUserInput}
              error={errors?.second_name}
              onBlur={this.onBlur(validateName(profile?.second_name || ''))}
              onFocus={this.onFocus}
            />
            <Form.Input
              id="first_name"
              label={t('first_name')}
              fluid
              onChange={this.handleUserInput}
              value={profile?.first_name || ''}
              error={errors?.first_name}
              onBlur={this.onBlur(validateName(profile?.first_name || ''))}
              onFocus={this.onFocus}
            />
            <Form.Input
              id="login"
              label={t('login')}
              fluid
              onChange={this.handleUserInput}
              value={profile?.login || ''}
              error={errors?.login}
              onBlur={this.onBlur(validateLoginAndPassword(profile?.login || ''))}
              onFocus={this.onFocus}
            />
            <Form.Input
              id="email"
              label={t('email')}
              fluid
              onChange={this.handleUserInput}
              value={profile?.email || ''}
              error={errors?.email}
              onBlur={this.onBlur(validateEmail(profile?.email || ''))}
              onFocus={this.onFocus}
            />
            <Form.Input
              id="phone"
              label={t('phone')}
              fluid
              onChange={this.handleUserInput}
              value={profile?.phone || ''}
              error={errors?.phone}
              onBlur={this.onBlur(validatePhone(profile?.phone || ''))}
              onFocus={this.onFocus}
            />
            <Button onClick={this.saveChanges} color="blue" type="button">
              {t('saveButton')}
            </Button>
            <Button type="button">{t('cancelButton')}</Button>
            {
              notification && (
                <div className="profile__notification">
                  <Label color={notification?.color}>
                    {notification?.message}
                  </Label>
                </div>
              )
            }
          </Form>

        </div>
      </div>
    );
  }
}
