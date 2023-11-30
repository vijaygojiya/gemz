import React from "react";
import { SafeAreaView } from "react-native";
import { Heading, Text, VStack } from "@gluestack-ui/themed";

import Colors from "../../../../constants/Colors";

import PositionList from "./common/PositionList";

export interface IPositionsCard {
  id: number;
  security_name: string;
  ticker: string;
  percentage: string;
  market_value: string;
}

export default function Positions() {
  return (
    <SafeAreaView>
      <VStack space="md">
        <Heading>Positions</Heading>
        <Text size="3xl" color={Colors.dark}>
          $525,193.06
        </Text>
        <PositionList />
      </VStack>
    </SafeAreaView>
  );
}
