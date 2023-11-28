import React, { useContext, useEffect } from "react";
import { Redirect, router } from "expo-router";
import {
  Button,
  ButtonText,
  Heading,
  ScrollView,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";

import Listings from "../../components/Main/Overview/Listings";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../context/AuthProvider";

export default function index() {
  const { logout,getTokenFromSecureStore } = useContext(AuthContext);

  const initializeAuthState = async () => {
    // Retrieve the access token from SecureStore
    const accessToken = await getTokenFromSecureStore("accessToken");
    // If there is a stored access token, set the authentication state
    if (!accessToken) {
      router.replace("/(auth)/Onboarding")
    }

  };
  useEffect(() => {
    // Initialize the authentication state
    initializeAuthState();
  }, []);

  return (
    <View bg="#fff" height="100%">
      <ScrollView>
        <VStack space="2xl" mt="$10" py="$5" px="$3">
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button onPress={() =>{ logout()
                initializeAuthState();
            }}>
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
