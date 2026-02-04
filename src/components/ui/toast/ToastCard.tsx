import { useAppTheme } from '@/context/ThemeContext';
import { FontFamily } from '@/theme';
import {
  BaseToast,
  BaseToastProps,
  ToastType,
} from 'react-native-toast-message';
import { ScrollView } from 'react-native';

const COLORS: Record<ToastType, string> = {
  success: '#22c55e',
  error: '#ef4444',
  info: '#3b82f6',
};

interface ToastCardProps extends BaseToastProps {
  type: ToastType;
}

const ToastCard = (props: ToastCardProps) => {
  const { color } = useAppTheme();
  const leftColor = COLORS[props.type] ?? '#6b7280';

  return (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: leftColor,
        maxHeight: 140, // allow grow till this
      }}
      contentContainerStyle={{
        backgroundColor: color.background_secondary,
        paddingVertical: 10,
        paddingHorizontal: 12,
        flex: 1,
      }}
      text1NumberOfLines={2}
      text2NumberOfLines={0} // allow unlimited lines
      text2Props={
        {
          // scrollEnabled: true,
        }
      }
      text1Style={{
        color: color.text_primary,
        fontSize: 14,
        fontFamily: FontFamily.InterTightSemiBold,
      }}
      text2Style={{
        color: color.text_secondary,
        fontSize: 12,
        fontFamily: FontFamily.InterTightBlack,
      }}
    />
  );
};

export default ToastCard;
