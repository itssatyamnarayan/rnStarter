import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/types/navigation.types';
import { AppStack } from './stacks/app.stack';
import { AuthStack } from './stacks/auth.stack';

interface RootNavigatorProps {
  onReady?: () => void;
}

export const RootNavigator: React.FC<RootNavigatorProps> = ({ onReady }) => {
  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      {false ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
