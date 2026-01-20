import CustomButton from '@/components/shared/CustomButton';
import FormInput from '@/components/shared/form-input/FormInput';
import { useAppTheme } from '@/context/ThemeContext';
import { AuthStackScreenProps } from '@/types/navigation.types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { layout } from '@/theme/layout';
import { View } from 'react-native';

type Props = AuthStackScreenProps<'ForgotPassword'>;

interface ForgotPasswordFormType {
  email: string;
}

const ForgotPassword = ({}: Props) => {
  const {
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>();

  const { color } = useAppTheme();
  const { t } = useTranslation();

  return (
    <View style={[layout.flexContainer, { backgroundColor: color.background }]}>
      <FormInput
        control={control}
        name="email"
        rules={{ required: true }}
        label={t('auth.email')}
        inputProps={{
          placeholder: t('auth.enterEmail'),
          keyboardType: 'email-address',
        }}
        error={errors.email?.message}
        variant="text"
      />

      <CustomButton
        title={t('auth.send-now')}
        onPress={() => {}}
        variant="primary"
        fullWidth
      />
    </View>
  );
};

export default ForgotPassword;
