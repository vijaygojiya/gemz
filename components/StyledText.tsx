import React from "react";
import { type TextProps } from "react-native";
import { Text } from "@gluestack-ui/themed";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}
