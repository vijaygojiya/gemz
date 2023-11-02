import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { LayoutGridIcon, UploadCloudIcon, SearchIcon, BellIcon} from 'lucide-react-native';

import Colors from '../../constants/Colors';
import { Icon } from '@gluestack-ui/themed';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="Overview"
        options={{
          headerShown: false,
          tabBarLabel: "Overview",
          tabBarIcon: ({ color }) => <Icon as={LayoutGridIcon} color="black" size="xl"/>,
        }}
      />
      <Tabs.Screen
        name="Upload"
        options={{
          tabBarLabel: "Upload",
          tabBarIcon: ({ color }) => <Icon as={UploadCloudIcon} color="black" size="xl"/>,
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => <Icon as={SearchIcon} color="black" size="xl"/>,
        }}
      />
      <Tabs.Screen
        name="Notification"
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => <Icon as={BellIcon} color="black" size="xl"/>,
        }}
      />
    </Tabs>
  );
}
