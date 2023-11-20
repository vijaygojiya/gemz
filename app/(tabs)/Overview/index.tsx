import { Box, HStack, Heading, Text, VStack, View } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import Header from "../../../components/General/Header";
import Listings from "../../../components/Main/Overview/Listings";
import Colors from "../../../constants/Colors";
import IndexCard from "../../../components/Main/Overview/NetworthCard";
import NetWorthCard from "../../../components/Main/Overview/NetworthCard";

export default function Overview() {
  return (
    <View bg="#fff" height="100%">
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />
      <VStack space="2xl" mt="$20" py="$5" px="$3">
        <View flexDirection="row" justifyContent="space-between" alignItems="center">
          <VStack space="none">
            <Heading fontWeight="light" size="xl">
              Welcome,
            </Heading>
            <Heading fontWeight="light" size="xl">
              Krish Parekh{" "}
            </Heading>
          </VStack>
          <VStack>
            <Text size="xs" color={Colors.dark}>
              Your daily profit
            </Text>
            <Text color={Colors.dark} bold>
              SGD 35K
            </Text>
          </VStack>
        </View>
        <Listings />
        <NetWorthCard />
      </VStack>
    </View>
  );
}
