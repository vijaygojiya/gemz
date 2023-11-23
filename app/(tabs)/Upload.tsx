import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  Box,
  Button,
  ButtonText,
  Fab,
  FabIcon,
  HStack,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  ScrollView,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";

import { CircleIcon, PlusIcon } from "lucide-react-native";

interface Item {
  id: number;
  label: string;
}

const SelectableItem: React.FC<{
  item: Item;
  selected: boolean;
  onSelect: () => void;
}> = ({ item, selected, onSelect }) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <View
        style={selected ? styles.selectedItem : styles.unselectedItem}
        borderRadius="$lg"
        borderWidth="$1"
        p="$1.5"
      >
        <Text size="xs" color={selected ? "#fff" : "#000"} fontWeight="bold">
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Upload() {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [values, setValues] = useState("Position");

  const handleClose = () => {
    setShowActionsheet(!showActionsheet);
  };

  const custodians = [
    { id: 1, label: "Item 1" },
    { id: 2, label: "Item 2" },
    { id: 3, label: "Item 3" },
    { id: 4, label: "Item 4" },
    { id: 5, label: "Item 5" },
    { id: 6, label: "Item 6" },
    { id: 7, label: "Item 7" },
  ];

  const accountNumbers = [
    { id: 1, label: "Item 1" },
    { id: 2, label: "Item 2" },
    { id: 3, label: "Item 3" },
    { id: 4, label: "Item 4" },
  ];

  const handleSelectItem = (item: Item) => {
    setSelectedItem(item.id === selectedItem ? null : item.id);
  };

  return (
    <Box h="100%" p="$6" justifyContent="space-between">
      <View style={styles.card}>
        <VStack>
          <Text fontWeight="bold" size="2xl">
            Upload your files
          </Text>
          <Text size="xs">{"(jpeg, pdf, svg)"}</Text>
        </VStack>
      </View>
      <Box
        borderRadius="$full"
        justifyContent="center"
        alignItems="center"
        position="fixed"
      >
        <Fab
          size="lg"
          placement="bottom center"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          onPress={handleClose}
        >
          <FabIcon as={PlusIcon} size="xl" />
        </Fab>
      </Box>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="60%" zIndex={999}>
          <View p="$4">
            <ScrollView>
              <VStack space="2xl">
                <VStack space="md">
                  <Text fontWeight="bold" textAlign="left">
                    Choose custodian
                  </Text>
                  <HStack space="lg" overflow="hidden" flexWrap="wrap">
                    {custodians.map((item) => (
                      <SelectableItem
                        key={item.id}
                        item={item}
                        selected={item.id === selectedItem}
                        onSelect={() => {
                          handleSelectItem(item);
                        }}
                      />
                    ))}
                  </HStack>
                </VStack>
                <VStack space="md">
                  <Text fontWeight="bold">Choose Account number</Text>
                  <HStack space="lg" overflow="hidden" flexWrap="wrap">
                    {accountNumbers.map((item) => (
                      <SelectableItem
                        key={item.id}
                        item={item}
                        selected={item.id === selectedItem}
                        onSelect={() => {
                          handleSelectItem(item);
                        }}
                      />
                    ))}
                  </HStack>
                </VStack>
                <VStack space="md">
                  <Text fontWeight="bold">Choose statement type</Text>
                  <RadioGroup value={values} onChange={setValues}>
                    <HStack space="xl" overflow="hidden" flexWrap="wrap">
                      <Radio value="Position">
                        <RadioIndicator mr="$2">
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel fontWeight="bold" size="sm">
                          Position
                        </RadioLabel>
                      </Radio>
                      <Radio value="Transaction">
                        <RadioIndicator mr="$2">
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel fontWeight="bold" size="sm">
                          Transaction
                        </RadioLabel>
                      </Radio>
                      <Radio value="Combined">
                        <RadioIndicator mr="$2">
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel fontWeight="bold" size="sm">
                          Combined
                        </RadioLabel>
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </VStack>
                <VStack space="md">
                  <Text fontWeight="bold">Choose date</Text>
                  <Button
                    size="lg"
                    borderRadius="$lg"
                    bg="#1890FF"
                    flexDirection="row"
                    alignItems="center"
                    // onPress={() => setShow(true)}
                  >
                    <ButtonText>Select date</ButtonText>
                  </Button>
                </VStack>
              </VStack>
            </ScrollView>
          </View>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    height: "85%",
    padding: 16,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
  },
  selectedItem: {
    backgroundColor: "#1890FF",
  },
  unselectedItem: {
    backgroundColor: "white",
  },
});
