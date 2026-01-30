import CustomButton from '@/components/shared/CustomButton';
import FormInput from '@/components/shared/form-input/FormInput';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setUserAction } from '@/redux/slice/user.slice';
import { layout } from '@/theme/layout';
import { AppStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

type Props = AppStackScreenProps<'ProfileSetup'>;

interface ProfileSetupFormType {
  name: string;
  phoneNumber: string;
  gender: string;
  address: string;
  dob: Date;
  currentTime: Date;
  profilePicture: string;
}

const ProfileSetup = ({ navigation }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileSetupFormType>({
    defaultValues: {
      dob: undefined,
      currentTime: undefined,
    },
  });
  const dispatch = useAppDispatch();

  const handleContinue = async (data: ProfileSetupFormType) => {
    console.log('Profile Data:', {
      ...data,
      // dob: data.dob.toISOString(),
      // currentTime: data.currentTime.toISOString(),
    });
    dispatch(setUserAction({ id: 'user-id', isProfileSetup: true }));
    navigation.replace('BottomTabs', {
      screen: 'Home',
    });
  };
  return (
    <View style={layout.flexContainer}>
      <FormInput
        control={control}
        name="name"
        // rules={{ required: 'Name is required' }}
        label="Name"
        placeholder="Enter your name"
        // error={errors.name?.message}
        variant="text"
        // leftIcon={<Icon name="downArrow" size={20} />}
        // rightIcon={<Icon name="downArrow" size={20} />}
        // isPassword
      />

      <FormInput
        control={control}
        name="phoneNumber"
        // rules={{ required: true }}
        label="Phone Number"
        placeholder="Enter your phone number"
        // error={errors.phoneNumber?.message}
        variant="country-phone"
        // showFlag={false}
      />

      <FormInput
        control={control}
        name="gender"
        // rules={{ required: true }}
        label="Gender"
        // error={errors.gender?.message}
        variant="dropdown"
        dropdownData={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' },
        ]}
        placeholder="Select your gender"
      />
      <FormInput
        control={control}
        name="dob"
        // rules={{ required: true }}
        label="Date of Birth"
        placeholder="Select your date of birth"
        // error={errors.dob?.message}
        variant="date"
        maximumDate={new Date()}
        // disabled
      />

      <FormInput
        control={control}
        name="currentTime"
        // rules={{ required: true }}
        label="Current Time"
        placeholder="Enter your current time"
        // error={errors.currentTime?.message}
        variant="time"
        iconName="clock"
      />
      <FormInput
        control={control}
        name="address"
        // rules={{ required: true }}
        label="Address"
        placeholder="Enter your address"
        // error={errors.address?.message}
        variant="text"
      />

      <CustomButton
        title="Continue"
        onPress={handleSubmit(handleContinue)}
        variant="primary"
        fullWidth
      />
    </View>
  );
};

export default ProfileSetup;
