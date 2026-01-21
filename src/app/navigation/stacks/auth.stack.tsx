import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation.types';
import { ForgotPassword, Login, ProfileSetup, Signup } from '@/screens/auth';
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
        headerStyle: { backgroundColor: color.background_primary },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />

      <Stack.Group
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
          headerTitleStyle: {
            fontFamily: FontFamily.InterTightMedium,
            color: color.text_primary,
            fontSize: 20,
          },
        })}
      >
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={() => ({
            headerShown: true,
            title: 'Forgot Password?',
          })}
        />
        <Stack.Screen
          name="ProfileSetup"
          component={ProfileSetup}
          options={() => ({
            title: 'Profile Setup',
            headerLeft: () => null,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
