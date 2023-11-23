import React from "react";
import { Tabs } from "expo-router";
import { Icon } from "@gluestack-ui/themed";

import Colors from "../../constants/Colors";

import {
  BellIcon,
  LayoutGridIcon,
  SearchIcon,
  UploadCloudIcon,
} from "lucide-react-native";

export default function TabLayout() {
  // const authContext = useContext(AuthContext);

  // console.log(isLoggedIn,"Index Logged In")

  // if (!isLoggedIn) {
  //   return <Redirect href={"/(auth)/Onboarding"} />;
  //   // router.push("/(auth)/Onboarding")
  // }

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
