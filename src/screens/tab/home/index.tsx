import CustomText from '@/components/shared/CustomText';
import { layout } from '@/theme/layout';
import { TabScreenProps } from '@/types/navigation.types';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

type props = TabScreenProps<'Home'>;

const Home = ({}: props) => {
  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2:
        'This is an error messagsesssss 👋This is an error messages 👋This is an error messages 👋This is an error messages 👋This is an error messages 👋',
      position: 'top',
      avoidKeyboard: true,
      topOffset: 50,
      visibilityTime: 4000,
      autoHide: true,
      props: {},
    });
  }, []);
  return (
    <SafeAreaView>
      <CustomText
        variant="header"
        textAlign="center"
        style={layout.marginTopMd}
      >
        Home Screen
      </CustomText>
    </SafeAreaView>
  );
};

export default Home;
