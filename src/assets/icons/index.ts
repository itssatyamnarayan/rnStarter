import Back from './back.svg';
import DownArrow from './downArrow.svg';
import Eye from './eye.svg';
import EyeClose from './eyeClose.svg';
import Home from './home.svg';
import Setting from './setting.svg';
import Tooltip_dark from './tooltip_dark.svg';
import Tooltip_light from './tooltip_light.svg';

export const Icons = {
  back: Back,
  downArrow: DownArrow,
  eye: Eye,
  eyeClose: EyeClose,
  home: Home,
  setting: Setting,
  tooltip_dark: Tooltip_dark,
  tooltip_light: Tooltip_light,
} as const;

export type IconName = keyof typeof Icons;
