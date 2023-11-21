import { HStack, Center, Text } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import PositionIcon from "../../../assets/images/Investment.svg";
import PhysicalIcon from "../../../assets/images/physical.svg";
import BankIcon from "../../../assets/images/bank.svg";
import LiquidIcon from "../../../assets/images/liquid.svg";
import NetWorthCard from "./NetworthCard";
import { Link } from "expo-router";

export default function OverviewList() {
  return (
    <>
      <NetWorthCard />
      <HStack space="sm">
        <TouchableOpacity style={styles.card}>
          <Center>
            <PositionIcon />
          </Center>
          <Text size="sm" textAlign="center" mt="$2">
            Positions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Center>
            <PhysicalIcon />
          </Center>
          <Text size="sm" textAlign="center" mt="$2">
            Physical Investments
          </Text>
        </TouchableOpacity>
      </HStack>
      <HStack space="sm">
        <TouchableOpacity style={styles.card}>
          <Center>
            <BankIcon />
          </Center>
          <Text size="sm" textAlign="center" mt="$2">
            Holdings Accounts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Center>
            <LiquidIcon />
          </Center>
          <Text size="sm" textAlign="center" mt="$2">
            Liquid Investments
          </Text>
        </TouchableOpacity>
      </HStack>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1, // Adjust opacity to make the shadow lighter
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
