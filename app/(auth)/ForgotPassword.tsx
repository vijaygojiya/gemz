import {
  Box,
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
  Center,
  ChevronRightIcon,
  FormControl,
  Heading,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Spinner,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { User } from "lucide-react-native";
import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { Link, router } from "expo-router";
import Colors from "../../constants/Colors";
import ForgotPasswordForm from "../../components/Auth/Form/ForgotPasswordForm";

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
