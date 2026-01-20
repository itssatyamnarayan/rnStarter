import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation.types';
import { ForgotPassword, Login, Signup } from '@/screens/auth';
import HeaderBackButton from '@/components/shared/navigation/HeaderBackButton';
import { FontFamily } from '@/theme';
import { useAppTheme } from '@/context/ThemeContext';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  const { color } = useAppTheme();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: color.background },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Forgot Password?',
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
          headerTitleStyle: {
            fontFamily: FontFamily.InterTightMedium,
            color: color.textPrimary,
            fontSize: 20,
          },
        })}
      />
    </Stack.Navigator>
  );
};
