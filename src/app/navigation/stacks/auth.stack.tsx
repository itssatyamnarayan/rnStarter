import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation.types';
import { Login, Signup } from '@/screens/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
);
