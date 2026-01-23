import { IconName } from '@/assets/icons';
import { palette } from './palette';

export const light = {
  color: {
    primary: palette.blue[500],
    secondary: palette.blue[500],
    background_primary: palette.white[900],
    background_secondary: palette.white[200],
    text_primary: palette.black[500],
    text_secondary: palette.gray[100],
    border: palette.gray[200],
    placeholder: palette.gray[400],
    text_default: palette.white[900],
    danger: palette.red[500],
    disabled: palette.white[100],
  },
  icon: {
    tooltip: 'tooltip_light' as IconName,
  } satisfies Record<string, IconName>,
};
