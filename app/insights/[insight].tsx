import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@gluestack-ui/themed";

export default function Insight() {
  const { insight } = useLocalSearchParams<{ insight: string }>();
  return <Text>{insight}</Text>;
}
