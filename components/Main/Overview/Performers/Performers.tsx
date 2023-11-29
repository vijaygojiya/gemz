import React, { useState } from "react";
import { Text, VStack } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native";
import PerformerSwitch from "./common/PerformerSwitch";
import PerformerList from "./common/PerformerList";

export interface IPerformerCard {
  id: number;
  name: string;
  percentage: string;
  total_pl: string;
}

export default function Performers() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (selectedTab: number) => {
    setSelectedTab(selectedTab);
  };

  return (
    <VStack space="md">
      <PerformerSwitch
        selectedTab={selectedTab}
        setSelectedTab={handleSelectedTab}
      />
      {selectedTab === 0 ? (
        <Text>Top Gain: 20.74K</Text>
      ) : (
        <Text>Top Loss: -809.72K</Text>
      )}
      <SafeAreaView style={{ flex: 1 }}>
        <PerformerList selectedTab={selectedTab} />
      </SafeAreaView>
    </VStack>
  );
}
