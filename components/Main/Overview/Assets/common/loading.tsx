import React from "react";
import { ActivityIndicator } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";

export const Loading = () => {
  return (
    <Box alignItems="center" height={400} flex={1} justifyContent="center">
      <Text>We&apos;re fetching your data...</Text>
      <ActivityIndicator />
    </Box>
  );
};
