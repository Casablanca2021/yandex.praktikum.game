import { get, put } from 'api/http';
import { ApiPath } from './consts';

interface Theme {
  getTheme: (user: string) => Promise<string>;
  setTheme: (theme: string) => Promise<void>;
}

export const Theme: Theme = {
  getTheme: (user: string): Promise<string> => get(`${ApiPath.THEME}?user=${user}`),

  setTheme: (theme: string): Promise<void> => put(ApiPath.THEME, { theme }),
};
