import { IconName, Icons } from '@/assets/icons';
import React from 'react';
import { SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
  color?: string;
}

const Icon = ({ name, size = 24, color = '#000', ...props }: IconProps) => {
  const Component = Icons[name];

  return <Component width={size} height={size} fill={color} {...props} />;
};

export default Icon;
