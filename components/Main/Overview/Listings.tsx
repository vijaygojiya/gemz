import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import { useState } from "react";
import Colors from "../../../constants/Colors";

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

export default function Listings() {
  const [activeTab, setActiveTab] = useState(tabsData[0]);
  return (
    <Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="lg" mx="$0.5">
          {tabsData.map((tab: any) => (
            <Pressable
              key={tab.title}
              my="$0.5"
              py="$1"
              borderBottomWidth={activeTab === tab ? 3 : 0}
              borderColor="$borderLight900"
              sx={{
                ":hover": {
                  borderBottomWidth: 3,
                  borderColor:
                  activeTab === tab
                      ? "$borderLight900"
                      : "$borderLight200",
                },
              }}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                size="sm"
                color={activeTab === tab ? Colors.dark : "$textLight600"}
                fontWeight="$medium"
              >
                {tab.title}
              </Text>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
}
