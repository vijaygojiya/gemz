import React, { useState } from "react";
import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../../constants/Colors";

type TPerformer = "Gainer" | "Loser";

export default function Performers() {
  const [activeTab, setActiveTab] = useState<TPerformer>("Gainer");

  function handleTabPress(tabName: TPerformer) {
    setActiveTab(tabName);
  }

  const getTabStyles = (tabName: TPerformer) => ({
    ...styles.tab,
    ...(activeTab === tabName && styles.activeTab),
    backgroundColor: activeTab === tabName ? Colors.primary : undefined,
  });

  return (
    <>
      <View flexDirection="row" justifycontent="center" alignItems="center">
        <TouchableOpacity
          style={getTabStyles("Gainer")}
          onPress={() => handleTabPress("Gainer")}
        >
          <Text color={activeTab === "Gainer" ? "#fff" : Colors.primary}>
            Gainers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getTabStyles("Loser")}
          onPress={() => handleTabPress("Loser")}
        >
          <Text color={activeTab === "Loser" ? "#fff" : Colors.primary}>
            Losers
          </Text>
        </TouchableOpacity> 
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
});
