import { ToastConfig } from 'react-native-toast-message';
import ToastCard from './ToastCard';

export const toastConfig: ToastConfig = {
  success: props => <ToastCard {...props} type="success" />,
};
