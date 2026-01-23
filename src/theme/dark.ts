import { palette } from './palette';
import { light } from './light';
import { IconName } from '@/assets/icons';

export const dark = {
  color: {
    primary: palette.blue[500],
    secondary: palette.blue[400],
    background_primary: palette.black[900],
    background_secondary: palette.black[200],
    text_primary: palette.white[900],
    text_secondary: palette.gray[400],
    border: palette.gray[300],
    placeholder: palette.gray[400],
    text_default: palette.white[900],
    danger: palette.red[500],
    disabled: palette.gray[300],
  },
  icon: {
    tooltip: 'tooltip_dark',
  } satisfies Record<keyof typeof light.icon, IconName>,
} satisfies typeof light;
