import { useAppTheme } from '@/context/ThemeContext';
import { Home, Profile } from '@/screens/tab';
import { FontFamily } from '@/theme';
import { layout } from '@/theme/layout';
import { BottomTabParamList } from '@/types/navigation.types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator<BottomTabParamList>();

const AppBottomTabs = () => {
  const { color } = useAppTheme();
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: true,
        headerTitleStyle: {
          fontFamily: FontFamily.InterTightMedium,
          color: color.text_primary,
          fontSize: 20,
        },
        sceneStyle: [
          { backgroundColor: color.background_primary },
          layout.flex,
        ],
        headerStyle: { backgroundColor: color.background_secondary },
        tabBarStyle: { backgroundColor: color.background_secondary },
      }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
};

export default AppBottomTabs;
