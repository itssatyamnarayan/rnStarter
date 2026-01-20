import { Pressable } from 'react-native';
import Icon from '../Icon';
import { memo } from 'react';

const HeaderBackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={20}
      android_ripple={{ color: 'rgba(0,0,0,0.15)', borderless: true }}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      <Icon name="back" size={28} />
    </Pressable>
  );
};

export default memo(HeaderBackButton);
