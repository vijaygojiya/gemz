import { Redirect, router, Tabs } from "expo-router";
import {
  LayoutGridIcon,
  UploadCloudIcon,
  SearchIcon,
  BellIcon,
} from "lucide-react-native";

import Colors from "../../constants/Colors";
import { Icon } from "@gluestack-ui/themed";
import { useAuth } from "../../context/AuthProvider";
import { useEffect } from "react";

export default function TabLayout() {
  const { isLoggedIn } = useAuth();

  console.log(isLoggedIn,"Index Logged In")

  if (!isLoggedIn) {
    return <Redirect href={"/(auth)/Onboarding"} />;
    // router.push("/(auth)/Onboarding")
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: "Poppins",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Overview",
          tabBarIcon: ({ color }) => (
            <Icon as={LayoutGridIcon} color={color} size="xl" />
          ),
        }}
      />
      <Tabs.Screen
        name="Upload"
        options={{
          tabBarLabel: "Upload",
          tabBarIcon: ({ color }) => (
            <Icon as={UploadCloudIcon} color={color} size="xl" />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Icon as={SearchIcon} color={color} size="xl" />
          ),
        }}
      />
      <Tabs.Screen
        name="Notification"
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <Icon as={BellIcon} color={color} size="xl" />
          ),
        }}
      />
    </Tabs>
  );
}
