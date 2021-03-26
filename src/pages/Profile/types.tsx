type Profile = {
  id: number;
  // eslint-disable-next-line camelcase
  first_name: string;
  // eslint-disable-next-line camelcase
  second_name: string;
  // eslint-disable-next-line camelcase
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

type ProfileValidations = Record<keyof Profile, boolean>;

type Notification = { message: string, color:'red'|'green' }

type ProfileForm = {
  profile: Partial<Profile>;
  errors: Partial<ProfileValidations>;
  notification: Notification;
};

export { ProfileForm, Profile, Notification };
