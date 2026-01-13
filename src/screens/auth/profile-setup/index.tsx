import { AuthStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { View, Text } from 'react-native';

type props = AuthStackScreenProps<'ProfileSetup'>;

const ProfileSetup = ({}: props) => {
  return (
    <View>
      <Text>ProfileSetup Screen</Text>
    </View>
  );
};

export default ProfileSetup;
