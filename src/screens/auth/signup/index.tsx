import { AuthStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { View, Text } from 'react-native';

type props = AuthStackScreenProps<'Signup'>;

const Signup = ({}: props) => {
  return (
    <View>
      <Text>Signup Screen</Text>
    </View>
  );
};

export default Signup;
