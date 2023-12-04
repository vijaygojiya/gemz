import React from "react";
import { StyleSheet } from "react-native";
import {
  Badge,
  BadgeText,
  FlatList,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
interface Transaction {
  id: string;
  type: string;
  currency: string;
  title: string;
  referenceNumber: string;
  transactionDate: string;
  quantity: number;
  averagePrice: number;
  debit: number;
  credit: number;
  settlementDate: string;
  settlementAmount: string;
  description: string;
}

interface ITransactionCardProps {
  transaction: Transaction;
}

function TransactionCard({ transaction }: ITransactionCardProps) {
  return (
    <VStack space="md" style={styles.card}>
      <HStack space="md" justifyContent="flex-end" alignItems="center">
        <Badge>
          <BadgeText>{transaction.referenceNumber}</BadgeText>
        </Badge>
        <Badge action="success">
          <BadgeText>{transaction.type}</BadgeText>
        </Badge>
        <Badge variant="outline" action="muted">
          <BadgeText>{transaction.currency}</BadgeText>
        </Badge>
      </HStack>
      <Text style={styles.title}>{transaction.title}</Text>
      <VStack space="md">
        <HStack style={styles.parentItemContainer}>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Reference Number</Text>
            <Text style={styles.itemSubtitle}>
              {transaction.referenceNumber}
            </Text>
          </VStack>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Transaction Date</Text>
            <Text style={styles.itemSubtitle}>
              {transaction.transactionDate}
            </Text>
          </VStack>
        </HStack>
        <HStack style={styles.parentItemContainer}>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Quantity</Text>
            <Text style={styles.itemSubtitle}>{transaction.quantity}</Text>
          </VStack>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Average Price</Text>
            <Text style={styles.itemSubtitle}>{transaction.averagePrice}</Text>
          </VStack>
        </HStack>
        <HStack style={styles.parentItemContainer}>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Debit</Text>
            <Text style={styles.itemSubtitle}>{transaction.debit}</Text>
          </VStack>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Credit</Text>
            <Text style={styles.itemSubtitle}>{transaction.credit}</Text>
          </VStack>
        </HStack>
        <HStack style={styles.parentItemContainer}>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Settlement Date</Text>
            <Text style={styles.itemSubtitle}>
              {transaction.settlementDate}
            </Text>
          </VStack>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Settlement Amount</Text>
            <Text style={styles.itemSubtitle}>
              {transaction.settlementAmount}
            </Text>
          </VStack>
        </HStack>
        <VStack>
          <Text style={styles.itemTitle}>Description</Text>
          <Text style={styles.itemSubtitle}>{transaction.description}</Text>
        </VStack>
      </VStack>
    </VStack>
  );
}

const dummyData: Transaction[] = [
  {
    id: "1",
    type: "Deposit",
    currency: "SGD",
    title: "Singapore Dollar (By order of DBS Singapore)",
    referenceNumber: "350735379",
    transactionDate: "12-12-2023",
    quantity: 100,
    averagePrice: 50,
    debit: 0,
    credit: 100,
    settlementDate: "12-12-2023",
    settlementAmount: "100K",
    description: "Singapore Dollar",
  },
  {
    id: "2",
    type: "Withdrawal",
    currency: "SGD",
    title: "Singapore Dollar (By order of DBS Singapore)",
    referenceNumber: "350735379",
    transactionDate: "12-12-2023",
    quantity: 100,
    averagePrice: 50,
    debit: 100,
    credit: 0,
    settlementDate: "12-12-2023",
    settlementAmount: "100K",
    description: "Singapore Dollar",
  },
];

export default function TransactionList() {
  return (
    <FlatList
      data={dummyData}
      renderItem={({ item }: { item: Transaction }) => (
        <TransactionCard transaction={item} />
      )}
      keyExtractor={(item: Transaction) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  itemSubtitle: {
    fontSize: 12,
  },

  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  parentItemContainer: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
