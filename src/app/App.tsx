import { StatusBar } from 'react-native';
import { AppProviders } from './providers';
import { RootNavigator } from './navigation/root';
import '@/i18n';
import Toast from 'react-native-toast-message';
import { useAppTheme } from '@/context/ThemeContext';
import { toastConfig } from '@/services/toast';

const App = () => {
  const { theme } = useAppTheme();

  return (
    <AppProviders>
      <StatusBar barStyle={theme ? 'light-content' : 'dark-content'} />
      <RootNavigator />
      <Toast config={toastConfig} />
    </AppProviders>
  );
};

export default App;
