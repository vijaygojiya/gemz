import React from "react";
import { Alert, StyleSheet } from "react-native";
import {
  Badge,
  BadgeText,
  HStack,
  Icon,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { useTransactionServerDeleteMutation } from "../../../../../hooks/useMutation";
import revalidate from "../../../../../lib/revalidate";

import { type IBankStatement } from "./VaultzList";

import { Trash } from "lucide-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const statusColorMapping: any = {
  pending: "error",
  processing: "warning",
  completed: "success",
};

const URLs = {
  delete: "/statement/bank/{id}/",
};

const useStatementDelete = (id: string) => {
  const { trigger } = useTransactionServerDeleteMutation(
    URLs.delete.replace("{id}", id),
    {
      onSuccess(data, key, config) {
        console.log("Statement deleted successfully", data, key, config);
        revalidate("/statement/bank/");
      },
      onError(error, key, config) {
        console.log("Error deleting statement", error, key, config);
      },
    },
  );
  return { trigger };
};

const VaultsCard = (props: { results: IBankStatement }) => {
  const { id, status, upload_date, relationship_number, custodian_name } =
    props.results;
  const formattedDate = new Date(upload_date).toLocaleDateString();
  const badgeAction = statusColorMapping[status];

  const { trigger: deleteStatement } = useStatementDelete(id);
  const onDeletePress = () => {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteStatement();
        },
      },
    ]);
  };
  return (
    <VStack style={styles.card}>
      <HStack style={styles.headerContainer}>
        <Text style={styles.headerText}>{custodian_name}</Text>
        <HStack style={styles.iconContainer}>
          <TouchableOpacity onPress={onDeletePress}>
            <Icon as={Trash} />
          </TouchableOpacity>
        </HStack>
      </HStack>
      <VStack style={styles.itemContainer} space="md">
        <HStack>
          <Text style={styles.label}>Account Number </Text>
          <Text style={styles.value}>{relationship_number}</Text>
        </HStack>
        <HStack style={styles.items}>
          <Text>
            <Text style={styles.label}>Date Created </Text>
            <Text style={styles.value}>{formattedDate}</Text>
          </Text>
          <Badge
            size="md"
            variant="solid"
            borderRadius="$none"
            action={badgeAction}
          >
            <BadgeText style={styles.value}>{status}</BadgeText>
          </Badge>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default VaultsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    marginHorizontal: 4,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 16,
  },
  itemContainer: {
    padding: 12,
  },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  value: {
    fontSize: 12,
  },
});
