import Back from './back.svg';
import Calendar from './calendar.svg';
import Clock from './clock.svg';
import DownArrow from './downArrow.svg';
import Edit from './edit.svg';
import Eye from './eye.svg';
import EyeClose from './eyeClose.svg';
import Home from './home.svg';
import Setting from './setting.svg';
import Tooltip_dark from './tooltip_dark.svg';
import Tooltip_light from './tooltip_light.svg';

export const Icons = {
  back: Back,
  calendar: Calendar,
  clock: Clock,
  downArrow: DownArrow,
  edit: Edit,
  eye: Eye,
  eyeClose: EyeClose,
  home: Home,
  setting: Setting,
  tooltip_dark: Tooltip_dark,
  tooltip_light: Tooltip_light,
} as const;

export type IconName = keyof typeof Icons;
