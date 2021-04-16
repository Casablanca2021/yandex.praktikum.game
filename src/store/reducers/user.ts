import { UserInfoResponse } from 'api/types';
import { Action } from 'store/actions/types';

import { SET_USER_INFO } from 'store/consts';

const initialState: UserInfoResponse = {} as UserInfoResponse;

const user = (state = initialState, { type, payload }: Action<UserInfoResponse>) => {
  switch (type) {
    case SET_USER_INFO:
      return { ...payload };
    default:
      return state;
  }
};

export default user;
