import CustomButton from '@/components/shared/CustomButton';
import CustomText from '@/components/shared/CustomText';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { logoutAction } from '@/redux/slice/auth.slice';
import { persistor } from '@/store';
import { layout } from '@/theme/layout';
import { AppStackScreenProps } from '@/types';
import React from 'react';
import { View } from 'react-native';

type props = AppStackScreenProps<'MainTabs'>;

const MainTabs = ({ navigation }: props) => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(logoutAction());
    await persistor.purge();
  };
  const handleGoToHome = () => {
    navigation.navigate('BottomTabs', {
      screen: 'Home',
    });
  };

  return (
    <View>
      <CustomText
        variant="header"
        textAlign="center"
        style={layout.marginTopMd}
      >
        Main Tabs Screen
      </CustomText>
      <CustomButton
        onPress={handleGoToHome}
        title="Go to Home"
        containerStyle={layout.marginBottomMd}
      />
      <CustomButton onPress={handleLogout} title="Logout" />
    </View>
  );
};

export default MainTabs;
