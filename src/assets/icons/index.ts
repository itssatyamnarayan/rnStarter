import Back from './back.svg';
import Home from './home.svg';
import Setting from './setting.svg';

export const Icons = {
  back: Back,
  home: Home,
  setting: Setting,
} as const;

export type IconName = keyof typeof Icons;
