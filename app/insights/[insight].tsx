import React from "react";
import { ScrollView, VStack, View } from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";
import { TInsights } from "../../interfaces/Main";
import Positions from "../../components/Main/Overview/Positions/Positions";
import Holdings from "../../components/Main/Overview/Holdings/Holdings";
import Performers from "../../components/Main/Overview/Performers/Performers";
import Transactions from "../../components/Main/Overview/Transactions/Transactions";

function List(type: TInsights): React.ReactNode {
  switch (type) {
    case "positions":
      return <Positions />;
    case "holdings":
      return <Holdings />;
    case "performers":
      return <Performers />;
    case "transactions":
      return <Transactions />;
    default:
      return null;
  }
}

export default function Insight() {
  const { insight } = useLocalSearchParams<{ insight: TInsights }>();
  return (
    <View bg="#fff" height="100%">
      <ScrollView>
        <VStack space="2xl" mt="$20" py="$5" px="$3">
          {List(insight)}
        </VStack>
      </ScrollView>
    </View>
  );
}
