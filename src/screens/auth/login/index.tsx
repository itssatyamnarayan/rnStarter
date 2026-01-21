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

type Props = AuthStackScreenProps<'Login'>;

interface LoginFormType {
  email: string;
  password: string;
}

const Login = ({ navigation }: Props) => {
  const {
    control,
    formState: { errors },
  } = useForm<LoginFormType>();

  const { color } = useAppTheme();
  const { t } = useTranslation();

  const onNavigateToSignup = () => {
    navigation.navigate('Signup');
  };
  const onNavigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ProfileSetup' }],
    });
  };

  return (
    <SafeAreaView
      style={[
        layout.flexContainer,
        { backgroundColor: color.background_primary },
      ]}
    >
      <CustomText
        variant="header"
        weight="600"
        textColor={color.text_primary}
        textAlign="center"
      >
        {t('auth.welcome-back')}
      </CustomText>
      <FormInput
        control={control}
        name="email"
        rules={{ required: true }}
        label={t('auth.email')}
        placeholder={t('auth.enterEmail')}
        textInputProps={{
          keyboardType: 'email-address',
        }}
        error={errors.email?.message}
        variant="text"
        isTooltip
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
        isTooltip
      />

      <CustomButton
        title={t('auth.login')}
        onPress={handleLogin}
        variant="primary"
        fullWidth
      />

      <View style={layout.rowGapCenter}>
        <CustomText textColor={color.text_secondary}>
          {t('auth.forgotPassword')}
        </CustomText>
        <CustomText
          textColor={color.secondary}
          onPress={onNavigateToForgotPassword}
        >
          {t('auth.reset')}
        </CustomText>
      </View>

      <View style={layout.flexEnd}>
        <View style={layout.rowGapCenter}>
          <CustomText textColor={color.text_secondary}>
            {t('auth.dont-have-an-account')}
          </CustomText>
          <CustomText textColor={color.secondary} onPress={onNavigateToSignup}>
            {t('auth.create-account')}
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

export default Login;
