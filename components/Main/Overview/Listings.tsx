import React, { useState } from "react";
import {
  ScrollView,
  Pressable,
  Text,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import Colors from "../../../constants/Colors";
import OverviewList from "./OverviewList";
import Family from "./Family";
import Vaultz from "./Vaultz";
import Analysis from "./Analysis";
import Planning from "./Planning";
import Assets from "./Assets";
import { TTabType } from "../../../interfaces/Main";

const tabsData = [
  {
    title: "Overview",
  },
  {
    title: "Family",
  },
  {
    title: "Vaultz",
  },
  {
    title: "Analysis",
  },
  {
    title: "Planning",
  },
  {
    title: "Assets",
  },
];

function List(type: TTabType): React.ReactNode {
  switch (type) {
    case "Overview":
      return <OverviewList />;
    case "Family":
      return <Family />;
    case "Vaultz":
      return <Vaultz />;
    case "Analysis":
      return <Analysis />;
    case "Planning":
      return <Planning />;
    case "Assets":
      return <Assets />;
    default:
      return null;
  }
}

export default function Listings() {
  const [activeTab, setActiveTab] = useState<TTabType>("Overview");

  return (
    <VStack space="2xl">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="lg" mx="$0.5">
          {tabsData.map((tab: any) => (
            <Pressable
              key={tab.title}
              my="$0.5"
              py="$1"
              borderBottomWidth={activeTab === tab.title ? 3 : 0}
              borderColor="$borderLight900"
              onPress={() => setActiveTab(tab.title)}
            >
              <Text
                size="sm"
                color={activeTab === tab.title ? Colors.dark : "$textLight600"}
                fontWeight="$medium"
              >
                {tab.title}
              </Text>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
      {List(activeTab)}
    </VStack>
  );
}
