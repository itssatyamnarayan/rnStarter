import CustomButton from '@/components/shared/CustomButton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { logoutAction } from '@/redux/slice/auth.slice';
import { AppStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { View, Text } from 'react-native';

type props = AppStackScreenProps<'MainTabs'>;

const MainTabs = ({}: props) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <View>
      <Text>Main Tabs Screen</Text>
      <CustomButton onPress={handleLogout} title="Logout" />
    </View>
  );
};

export default MainTabs;
