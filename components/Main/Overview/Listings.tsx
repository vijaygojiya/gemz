import React, { useState } from "react";
import {
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import Colors from "../../../constants/Colors";
import { type TTabType } from "../../../interfaces/Main";

import Analysis from "./Analysis/Analysis";
import Assets from "./Assets/Assets";
import Family from "./Family/Family";
import OverviewList from "./OverviewList/OverviewList";
import Planning from "./Planning/Planning";
import Vaultz from "./Vaultz/Vaultz";

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
              onPress={() => {
                setActiveTab(tab.title);
              }}
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
