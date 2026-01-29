import CustomButton from '@/components/shared/CustomButton';
import CustomText from '@/components/shared/CustomText';
import FormInput from '@/components/shared/form-input/FormInput';
import { useAppTheme } from '@/context/ThemeContext';
import { AuthStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { layout } from '@/theme/layout';

type Props = AuthStackScreenProps<'Signup'>;

interface SignupFormType {
  email: string;
  password: string;
}

const Signup = ({ navigation }: Props) => {
  const {
    control,
    formState: { errors },
  } = useForm<SignupFormType>();

  const { color } = useAppTheme();
  const { t } = useTranslation();

  const onNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={layout.flexContainer}>
      <CustomText
        variant="header"
        weight="600"
        textColor={color.text_primary}
        textAlign="center"
      >
        {t('auth.lets-get-started')}
      </CustomText>
      <FormInput
        control={control}
        name="email"
        rules={{ required: true }}
        placeholder={t('auth.enterEmail')}
        label={t('auth.email')}
        textInputProps={{
          keyboardType: 'email-address',
        }}
        error={errors.email?.message}
        variant="text"
      />

      <FormInput
        control={control}
        name="password"
        rules={{ required: true }}
        label={t('auth.password')}
        placeholder={t('auth.enterPassword')}
        error={errors.password?.message}
        isPassword
        variant="text"
      />

      <CustomButton
        title={t('auth.create-account')}
        onPress={() => {}}
        variant="primary"
        fullWidth
      />

      <View style={layout.flexEnd}>
        <View style={layout.rowGapCenter}>
          <CustomText textColor={color.text_secondary}>
            {t('auth.alreadyHaveAccount')}
          </CustomText>
          <CustomText textColor={color.secondary} onPress={onNavigateToLogin}>
            Login
          </CustomText>
        </View>

        <View style={[layout.separator, { backgroundColor: color.border }]} />

        <CustomText textColor={color.text_secondary} textAlign="center">
          {t('auth.by-continuing-you-agree-to-our')}{' '}
          <CustomText textColor={color.text_primary} onPress={() => {}}>
            {t('auth.terms-of-service')}
          </CustomText>{' '}
          and{' '}
          <CustomText textColor={color.text_primary} onPress={() => {}}>
            {t('auth.privacy-policy')}
          </CustomText>
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
