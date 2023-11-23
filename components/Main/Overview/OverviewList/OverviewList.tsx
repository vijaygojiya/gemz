import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Center, HStack, Text } from "@gluestack-ui/themed";

import BankIcon from "../../../../assets/images/bank.svg";
import PositionIcon from "../../../../assets/images/Investment.svg";
import ProfitIcon from "../../../../assets/images/Profit.svg";
import TransactionIcon from "../../../../assets/images/Transactions.svg";

import NetWorthCard from "./NetworthCard";

export default function OverviewList() {
  return (
    <>
      <NetWorthCard />
      <HStack space="sm">
        <Link href={"/insights/positions"} asChild>
          <TouchableOpacity style={styles.card}>
            <Center>
              <PositionIcon />
            </Center>
            <Text size="sm" textAlign="center">
              Positions
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/insights/performers"} asChild>
          <TouchableOpacity style={styles.card}>
            <Center>
              <ProfitIcon />
            </Center>
            <Text size="sm" textAlign="center">
              Gainers and Losers
            </Text>
          </TouchableOpacity>
        </Link>
      </HStack>
      <HStack space="sm">
        <Link href={"/insights/holdings"} asChild>
          <TouchableOpacity style={styles.card}>
            <Center>
              <BankIcon />
            </Center>
            <Text size="sm" textAlign="center">
              Holdings Accounts
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/insights/transactions"} asChild>
          <TouchableOpacity style={styles.card}>
            <Center>
              <TransactionIcon />
            </Center>
            <Text size="sm" textAlign="center">
              Transactions
            </Text>
          </TouchableOpacity>
        </Link>
      </HStack>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    flex: 1,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Adjust opacity to make the shadow lighter
    shadowRadius: 4,
  },
});
