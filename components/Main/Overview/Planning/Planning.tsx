import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { VStack } from "@gluestack-ui/themed";

import EstateList from "./common/EstateList";
import GoalList from "./common/GoalList";
import PlanningHeader from "./common/PlanningHeader";
import SwitchButton from "./common/SwitchButton";

export default function Planning() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (selectedTab: number) => {
    setSelectedTab(selectedTab);
  };

  return (
    <VStack space="md">
      <SwitchButton
        selectedTab={selectedTab}
        setSelectedTab={handleSelectedTab}
      />
      <PlanningHeader selectedTab={selectedTab} />
      <SafeAreaView style={{ flex: 1 }}>
        {selectedTab === 0 ? <GoalList /> : <EstateList />}
      </SafeAreaView>
    </VStack>
  );
}
