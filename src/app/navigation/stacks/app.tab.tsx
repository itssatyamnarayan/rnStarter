import {
  renderHomeIcon,
  renderProfileIcon,
} from '@/components/shared/navigation/tabIconRender';
import { useAppTheme } from '@/context/ThemeContext';
import { Home, Profile } from '@/screens/tab';
import { FontFamily } from '@/theme';
import { layout } from '@/theme/layout';
import { BottomTabParamList } from '@/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator<BottomTabParamList>();

const AppBottomTabs = () => {
  const { color } = useAppTheme();

  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
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
        tabBarStyle: {
          backgroundColor: color.background_secondary,
          height: 80,
          paddingTop: 8,
        },
        tabBarAllowFontScaling: false,
        tabBarActiveTintColor: color.secondary,
        tabBarInactiveTintColor: color.text_secondary,
        tabBarLabelStyle: {
          fontFamily: FontFamily.InterTightRegular,
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tabs.Navigator>
  );
};

export default AppBottomTabs;
