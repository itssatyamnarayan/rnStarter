import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/types/navigation.types';
import { AppStack } from './stacks/app.stack';
import { AuthStack } from './stacks/auth.stack';
import { useAppSelector } from '@/hooks/useAppSelector';

interface RootNavigatorProps {
  onReady?: () => void;
}

export const RootNavigator: React.FC<RootNavigatorProps> = ({ onReady }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
