import { TabScreenProps } from '@/types/navigation.types';
import React from 'react';
import { View, Text } from 'react-native';

type props = TabScreenProps<'Profile'>;

const Profile = ({}: props) => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};

export default Profile;
