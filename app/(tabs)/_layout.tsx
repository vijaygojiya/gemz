import { Tabs } from 'expo-router';
import { LayoutGridIcon, UploadCloudIcon, SearchIcon, BellIcon} from 'lucide-react-native';

import Colors from '../../constants/Colors';
import { Icon } from '@gluestack-ui/themed';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: "Poppins"
        },
      }}>
      <Tabs.Screen
        name="Overview"
        options={{
          headerShown: false,
          tabBarLabel: "Overview",
          tabBarIcon: ({ color }) => <Icon as={LayoutGridIcon} color={color} size="xl"/>,
        }}
      />
      <Tabs.Screen
        name="Upload"
        options={{
          tabBarLabel: "Upload",
          tabBarIcon: ({ color }) => <Icon as={UploadCloudIcon} color={color} size="xl"/>,
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => <Icon as={SearchIcon} color={color} size="xl"/>,
        }}
      />
      <Tabs.Screen
        name="Notification"
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => <Icon as={BellIcon} color={color} size="xl"/>,
        }}
      />
    </Tabs>
  );
}
