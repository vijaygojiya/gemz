import React from "react";
import { Link } from "expo-router";
import { Box, Center, Heading, Text, VStack } from "@gluestack-ui/themed";

import Logo from "../../assets/images/logo.svg";
import ForgotPasswordForm from "../../components/Auth/Form/ForgotPasswordForm";
import Colors from "../../constants/Colors";

export default function ForgotPassword() {
  return (
    <Box h="100%" justifyContent="center" p="$6">
      <Center>
        <Logo />
      </Center>
      <VStack space="2xl" reversed={false} mt="$20">
        <Heading size="lg">Enter your Username</Heading>
        <ForgotPasswordForm />
      </VStack>
      <Link href={"/(auth)/Login"} asChild>
        <Text mt="$10" color={Colors.primary}>
          Back to Login
        </Text>
      </Link>
    </Box>
  );
}
