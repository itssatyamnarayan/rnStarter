import CustomButton from '@/components/shared/CustomButton';
import CustomText from '@/components/shared/CustomText';
import { AuthStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { View } from 'react-native';

type props = AuthStackScreenProps<'Login'>;

const Login = ({}: props) => {
  return (
    <View>
      <CustomText weight="800">Login Screen</CustomText>
      <CustomButton
        title="Login"
        onPress={() => {}}
        variant="primary"
        // fullWidth
        // loading
        size="large"
      />
    </View>
  );
};

export default Login;
