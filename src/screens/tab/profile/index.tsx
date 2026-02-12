import CustomButton from '@/components/shared/CustomButton';
import CustomText from '@/components/shared/text/CustomText';
import { layout } from '@/theme/layout';
import { TabScreenProps } from '@/types';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type props = TabScreenProps<'Profile'>;

const Profile = ({ navigation }: props) => {
  const handlePress = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView>
      <CustomText
        variant="header"
        textAlign="center"
        style={layout.marginTopMd}
      >
        Profile Screen
      </CustomText>
      <CustomButton title="Go to Main Tab" onPress={handlePress} />
    </SafeAreaView>
  );
};

export default Profile;
