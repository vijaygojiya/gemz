import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Divider,
  FlatList,
  HStack,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";

import {
  ChevronDownIcon,
  PieChart,
  SearchIcon,
  Tag,
  X,
} from "lucide-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ITransactionCardProps {
  name: string;
  symbol: string;
  assetClass: string;
  numberOfTrades: number;
}
const transactionData = [
  {
    name: "LGT",
    symbol: "LGT",
    assetClass: "Equity & Equivalent",
    numberOfTrades: 2,
  },
  {
    name: "DBS",
    symbol: "DBS",
    assetClass: "Cash & Equivalent",
    numberOfTrades: 2,
  },
  {
    name: "BOS",
    symbol: "BOS",
    assetClass: "Cash & Equivalent",
    numberOfTrades: 2,
  },
  {
    name: "JBS",
    symbol: "JBS",
    assetClass: "Cash & Equivalent",
    numberOfTrades: 2,
  },
];
function TransactionCard({
  name,
  symbol,
  assetClass,
  numberOfTrades,
}: ITransactionCardProps) {
  return (
    <VStack style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          router.push("/(modals)/TransactionDetail");
        }}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <Divider my="$0.5" />
        <HStack
          style={styles.itemContainer}
          alignItems="center"
          justifyContent="space-between"
        >
          <Badge size="md" style={styles.item}>
            <BadgeIcon as={Tag} mr="$2" />
            <BadgeText>{symbol}</BadgeText>
          </Badge>
          <Badge size="md" style={styles.item}>
            <BadgeIcon as={PieChart} mr="$2" />
            <BadgeText>{assetClass}</BadgeText>
          </Badge>
          <Text style={styles.itemText}>{numberOfTrades} Trades</Text>
        </HStack>
      </TouchableOpacity>
    </VStack>
  );
}

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const filteredData = transactionData.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const renderItem = ({ item }: { item: ITransactionCardProps }) => (
    <TransactionCard {...item} />
  );
  return (
    <VStack>
      <VStack space="md">
        <Select
          onValueChange={(value: string) => {
            setSelectedOption(value);
          }}
        >
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Select option" />
            <SelectIcon mr="$3">
              {selectedOption !== "" ? (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedOption("");
                  }}
                >
                  <Icon as={X} />
                </TouchableOpacity>
              ) : (
                <Icon as={ChevronDownIcon} />
              )}
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="DBS" value="dbs" />
              <SelectItem label="LGT" value="lgt" />
              <SelectItem label="BOS" value="bos" />
              <SelectItem label="JBS" value="jbs" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input>
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(value: string) => {
              setSearchQuery(value);
            }}
          />
        </Input>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item: ITransactionCardProps) => item.name}
        />
      </VStack>
    </VStack>
  );
}

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
    flex: 1,
    padding: 12,
  },
  item: {
    borderStyle: "dashed",
    borderWidth: 1,
    paddingVertical: 6,
  },
  itemContainer: {
    padding: 12,
  },
  itemText: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
