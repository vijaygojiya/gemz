import { StyleSheet } from "react-native";
import {
  Box,
  Center,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  View,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { Redirect, Stack } from "expo-router";
import Header from "../../components/General/Header";
import Listings from "../../components/Main/Overview/Listings";
import Colors from "../../constants/Colors";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import React from "react";
export default function index() {
  const {authState,logout} = useContext(AuthContext);

  if (authState?.authenticated === false) {
    return <Redirect href={"/(auth)/Onboarding"} />;
  }

  return (
    <View bg="#fff" height="100%">
      <ScrollView>
        <VStack space="2xl" mt="$10" py="$5" px="$3">
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button onPress={()=>logout()}>
              <ButtonText>Logout</ButtonText>
            </Button>
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
        </VStack>
      </ScrollView>
    </View>
  );
}
