import React from "react";
import { StyleSheet } from "react-native";
import { Heading, HStack, Text, View, VStack } from "@gluestack-ui/themed";

import Colors from "../../../../constants/Colors";

export default function NetWorthCard() {
  return (
    <View style={styles.card}>
      <VStack space="lg">
        <Heading
          size="lg"
          fontWeight="semibold"
          color={Colors.dark}
          textAlign="center"
        >
          Krish&apos;s family investment
        </Heading>
        <HStack space="4xl" justifyContent="center">
          <VStack>
            <Text color={Colors.dark}>Networth</Text>
            <Text>25.36M</Text>
          </VStack>
          <VStack>
            <Text color={Colors.dark}>Assets</Text>
            <Text>27.45M</Text>
          </VStack>
          <VStack>
            <Text color={Colors.dark}>Liabilites</Text>
            <Text>-450M</Text>
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
