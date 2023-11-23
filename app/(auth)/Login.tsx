import React from "react";
import { Box, Center, Heading, Text, VStack } from "@gluestack-ui/themed";

import Logo from "../../assets/images/logo.svg";
import LoginForm from "../../components/Auth/Form/LoginForm";

export default function Login() {
  return (
    <Box h="100%" justifyContent="center" p="$6">
      <Center>
        <Logo />
      </Center>
      <VStack space="3xl" reversed={false} mt="$20">
        <VStack space="xs">
          <Heading size="xl">Login</Heading>
          <Text size="sm">
            Maximize wealth management efficiency with Ethan.ai Cloud - unified
            portfolios, AI integration, simplified document search
          </Text>
        </VStack>
        <LoginForm />
      </VStack>
    </Box>
  );
}
