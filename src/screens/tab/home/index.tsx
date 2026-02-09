import CustomText from '@/components/shared/CustomText';
import AvatarPicker from '@/components/shared/AvatarPicker';
import { layout } from '@/theme/layout';
import { TabScreenProps } from '@/types';
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
      <AvatarPicker
        editable
        width={150}
        height={150}
        editIconSize={39}
        source="gallery"
        onImageChange={(image:any) => console.log('Selected image:', image)}
      />
    </SafeAreaView>
  );
};

export default Home;
