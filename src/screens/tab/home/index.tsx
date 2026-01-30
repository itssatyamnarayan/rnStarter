import CustomText from '@/components/shared/CustomText';
import { layout } from '@/theme/layout';
import { TabScreenProps } from '@/types/navigation.types';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type props = TabScreenProps<'Home'>;

const Home = ({}: props) => {
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
