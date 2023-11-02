import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  ChevronRightIcon,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { User } from "lucide-react-native";
import React from "react";
import Logo from "../../assets/images/logo.svg";
import { Link } from "expo-router";

export default function ForgotPassword() {
  return (
    <Box h="100%" justifyContent="center" p="$6">
      <Center>
        <Logo />
      </Center>
      <VStack space="2xl" reversed={false} mt="$20">
        <Heading size="lg">Enter your email id</Heading>
        <Input
          size="xl"
          borderRadius="$lg"
          borderWidth="$2"
          borderColor="black"
        >
          <InputSlot pl="$3">
            <InputIcon as={User} color="black" />
          </InputSlot>
          <InputField placeholder="email" fontSize="$md" />
        </Input>
      </VStack>
      <Link href={"/VerifyOTP"} asChild>
        <Button 
          size="lg"
          borderRadius="$lg"
          bg="#1890FF"
          mt="$10"
          flexDirection="row"
          alignItems="center"
        >
          <ButtonText>Proceed</ButtonText>
          <ButtonIcon
            as={ChevronRightIcon}
            h="$7"
            w="$7"
            ml="$3"
            mt="$1"
            strokeWidth={3}
          />
        </Button>
      </Link>
    </Box>
  );
}
