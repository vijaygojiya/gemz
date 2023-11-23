import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@gluestack-ui/themed";

import Colors from "../../constants/Colors";

export default function Header() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Text>Ethan Logo</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text color="#fff">K</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 45,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  container: {
    height: 100,
  },
  filterButton: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 24,
    display: "flex",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
});
