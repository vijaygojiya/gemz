import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  ChevronRightIcon,
  EyeIcon,
  EyeOffIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  VStack,
} from "@gluestack-ui/themed";
import { Lock } from "lucide-react-native";
import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { Link } from "expo-router";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  function handleVisibility() {
    setShowPassword(!showPassword);
  }
  return (
    <Box h="100%" justifyContent="center" p="$6">
      <Center>
        <Logo />
      </Center>
      <VStack space="3xl" reversed={false} mt="$20">
        <FormControl>
          <FormControlLabel mb="$1">
            <FormControlLabelText>Enter new password</FormControlLabelText>
          </FormControlLabel>
          <Input
            size="xl"
            borderRadius="$lg"
            borderWidth="$2"
            borderColor="black"
          >
            <InputSlot pl="$3">
              <InputIcon as={Lock} color="black" />
            </InputSlot>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="password"
              fontSize="$md"
            />
            <InputSlot pr="$3" onPress={handleVisibility}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel mb="$1">
            <FormControlLabelText>Confirm Password</FormControlLabelText>
          </FormControlLabel>
          <Input
            size="xl"
            borderRadius="$lg"
            borderWidth="$2"
            borderColor="black"
          >
            <InputSlot pl="$3">
              <InputIcon as={Lock} color="black" />
            </InputSlot>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              fontSize="$md"
            />
            <InputSlot pr="$3" onPress={handleVisibility}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </FormControl>
      </VStack>
      <Link href={"/Login"} asChild>
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
