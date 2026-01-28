import { Home, Profile } from '@/screens/tab';
import { BottomTabParamList } from '@/types/navigation.types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabs = () => (
  <Tabs.Navigator initialRouteName="Home">
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Profile" component={Profile} />
  </Tabs.Navigator>
);
