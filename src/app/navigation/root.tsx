import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/types/navigation.types';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuthenticated } from '@/redux/selectors/auth.selectors';
import AppStack from './stacks/app.stack';
import AuthStack from './stacks/auth.stack';

interface RootNavigatorProps {
  onReady?: () => void;
}

export const RootNavigator: React.FC<RootNavigatorProps> = ({ onReady }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
