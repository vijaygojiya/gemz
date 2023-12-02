import React from "react";
import { StyleSheet } from "react-native";
import { Heading, HStack, Text, View, VStack } from "@gluestack-ui/themed";

import Colors from "../../../../../constants/Colors";
import { convertNumUnit } from "../../../../../constants/utilFuctions";

interface fmailyHead {
  networth: {
    client_name: string;
    curryency: string;
    liabilities: number;
    networth: number;
    assets: number;
  };
}

export default function FamilyHead({ networth }: fmailyHead) {
  return (
    <View style={styles.card} mt="$7">
      <VStack space="lg">
        <Heading size="xl" bold fontWeight="semibold" color={Colors.dark}>
          {networth.client_name}
        </Heading>
        <HStack space="4xl" justifyContent="space-between">
          <VStack>
            <Text color={Colors.dark} bold>
              Networth
            </Text>
            <Text color={Colors.dark} mt="$2">
              {networth.curryency} {convertNumUnit(networth.networth)}
            </Text>
          </VStack>
          <VStack>
            <Text color={Colors.lightGreen} bold>
              Assets
            </Text>
            <Text color={Colors.lightGreen} mt="$2">
              {networth.curryency} {convertNumUnit(networth.assets)}
            </Text>
          </VStack>
          <VStack>
            <Text color={Colors.error} bold>
              Liabilities
            </Text>
            <Text color={Colors.error} mt="$2">
              {networth.curryency} {convertNumUnit(networth.liabilities)}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Adjust opacity to make the shadow lighter
    shadowRadius: 4,
  },
});
