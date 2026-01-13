import { TabScreenProps } from '@/types/navigation.types';
import React from 'react';
import { View, Text } from 'react-native';

type props = TabScreenProps<'Home'>;

const Home = ({}: props) => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Home;
