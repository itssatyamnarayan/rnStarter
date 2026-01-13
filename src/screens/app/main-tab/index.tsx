import { AppStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { View, Text } from 'react-native';

type props = AppStackScreenProps<'MainTabs'>;

const MainTabs = ({}: props) => {
  return (
    <View>
      <Text>Main Tabs Screen</Text>
    </View>
  );
};

export default MainTabs;
