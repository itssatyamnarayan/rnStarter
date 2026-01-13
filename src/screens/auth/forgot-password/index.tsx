import { AuthStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { View, Text } from 'react-native';

type props = AuthStackScreenProps<'ForgotPassword'>;

const ForgotPassword = ({}: props) => {
  return (
    <View>
      <Text>ForgotPassword Screen</Text>
    </View>
  );
};

export default ForgotPassword;
