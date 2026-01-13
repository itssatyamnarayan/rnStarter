import MainTabs from '@/screens/app/main-tab';
import { AppStackParamList } from '@/types/navigation.types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => (
  <Stack.Navigator initialRouteName="MainTabs">
    <Stack.Screen name="MainTabs" component={MainTabs} />
  </Stack.Navigator>
);
