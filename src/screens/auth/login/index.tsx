import CustomButton from '@/components/shared/CustomButton';
import CustomText from '@/components/shared/CustomText';
import FormInput from '@/components/shared/form-input/FormInput';
import TextInputVariant from '@/components/shared/form-input/variants/TextInputVariant';
import Icon from '@/components/shared/Icon';
import { AuthStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

type props = AuthStackScreenProps<'Login'>;

const Login = ({}: props) => {
  const {
    control,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();

  return (
    <View style={{ flex: 1, padding: 16, gap: 16, backgroundColor: 'red' }}>
      <CustomText weight="800">Login Screen</CustomText>
      <FormInput
        control={control}
        name="email"
        rules={{ required: true }}
        label="Email"
        inputProps={{
          placeholder: 'Enter your email',
        }}
        error={errors.email?.message}
        variant="text"
        leftIcon={<Icon name="setting" size={20} color="white" />}
      />
      <FormInput
        control={control}
        name="password"
        rules={{ required: true }}
        label="Password"
        inputProps={{
          placeholder: 'Enter your password',
        }}
        error={errors.password?.message}
        variant="text"
      />

      <TextInputVariant
        // field={{
        //   value: '',
        //   onChange: () => {},
        // }}
        ref={null}
        value={'fgfg'}
        onChangeText={() => {}}
        inputProps={{
          placeholder: 'Custom Text Input Variant',
        }}
      />
      <CustomButton
        title="Login"
        onPress={() => {}}
        variant="primary"
        // fullWidth
        // loading
        size="large"
      />
    </View>
  );
};

export default Login;
