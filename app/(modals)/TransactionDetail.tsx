import React from "react";
import { StyleSheet } from "react-native";
import { VStack } from "@gluestack-ui/themed";

import TransactionList from "../../components/Main/Overview/Transactions/common/TransactionList";

export default function TransactionDetail() {
  return (
    <VStack style={styles.container}>
      <TransactionList />
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
