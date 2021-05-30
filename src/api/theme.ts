import { get, post } from 'api/http';
import { ApiPath } from 'api/consts';
import { ThemeRequest } from 'api/types';

interface Theme {
  getTheme: (user: string) => Promise<string>;
  setTheme: (data: ThemeRequest) => Promise<void>;
}

export const Theme: Theme = {
  getTheme: (user: string): Promise<string> => get(`${ApiPath.THEME}?user=${user}`),

  setTheme: (data: ThemeRequest): Promise<void> => post(ApiPath.THEME, data),
};
