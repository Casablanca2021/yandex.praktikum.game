import { AppState } from './types';

export const getAuthSelector = (state: AppState) => state.auth;

export const getUserSelector = (state: AppState) => state.user;
