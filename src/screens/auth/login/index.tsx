import CustomButton from '@/components/shared/CustomButton';
import { AuthStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { Text, View } from 'react-native';

type props = AuthStackScreenProps<'Login'>;

const Login = ({}: props) => {
  return (
    <View>
      <Text>Login Screen</Text>
      <CustomButton title="Login" onPress={() => {}} />
    </View>
  );
};

export default Login;
