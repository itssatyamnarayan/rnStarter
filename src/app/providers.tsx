import { ThemeProvider } from '@/context/ThemeContext';
import { persistor, store } from '@/store';
import React, { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

type Props = {
  children: ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>{children}</ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
