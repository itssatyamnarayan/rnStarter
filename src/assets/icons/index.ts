import Back from './back.svg';
import Eye from './eye.svg';
import EyeOff from './eyeOff.svg';
import Home from './home.svg';
import Setting from './setting.svg';

export const Icons = {
  back: Back,
  eye: Eye,
  eyeOff: EyeOff,
  home: Home,
  setting: Setting,
} as const;

export type IconName = keyof typeof Icons;
