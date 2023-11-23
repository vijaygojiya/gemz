import React, { useState } from "react";
import { ToastAndroid } from "react-native";
import { Link, router } from "expo-router";
import {
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Spinner,
  Text,
} from "@gluestack-ui/themed";

import { useAuthServerMutation } from "../../../hooks/useMutation";
import buildURLSearchParams from "../../../lib/buildURLSearchParams";

import {
  ChevronRightIcon,
  EyeIcon,
  EyeOffIcon,
  Lock,
  User,
} from "lucide-react-native";
interface IUserArgs {
  username: string;
  password: string;
}
interface ILoginResponse {
  user_id: number;
  phone_number: string;
  message?: string;
}
export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { trigger, isMutating } = useAuthServerMutation<
    IUserArgs,
    ILoginResponse
  >("/login", {
    onSuccess: (data) => {
      setCredentials({ username: "", password: "" });
      setErrors({ username: "", password: "" });
      ToastAndroid.show("Login Success", ToastAndroid.SHORT);
      router.push(
        `/VerifyOTP${buildURLSearchParams({
          phone_number: data.phone_number,
          user_id: data.user_id.toString(),
          next_path: "(tabs)",
        })}`,
      );
    },
  });

  function handleVisibility() {
    setShowPassword(!showPassword);
  }

  function validateForm() {
    const newErrors = {
      username: "",
      password: "",
    };
    if (!credentials.username) {
      newErrors.username = "Username is required";
    }
    if (!credentials.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return newErrors.username === "" && newErrors.password === "";
  }

  function handleLogin() {
    if (validateForm()) {
      trigger(credentials);
    }
  }

  function handleChange(name: string, value: string) {
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  return (
    <>
      <FormControl isInvalid={!!errors.username}>
        <Input
          size="xl"
          borderRadius="$lg"
          borderWidth="$2"
          borderColor="black"
        >
          <InputSlot pl="$3">
            <InputIcon as={User} color="black" />
          </InputSlot>
          <InputField
            value={credentials.username}
            placeholder="username"
            fontSize="$md"
            onChangeText={(val: string) => {
              handleChange("username", val);
            }}
          />
        </Input>
        <FormControlError>
          <FormControlErrorText>{errors.username}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
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
            value={credentials.password}
            type={showPassword ? "text" : "password"}
            placeholder="password"
            fontSize="$md"
            onChangeText={(val: string) => {
              handleChange("password", val);
            }}
          />
          <InputSlot pr="$3" onPress={handleVisibility}>
            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
          </InputSlot>
        </Input>
        <FormControlError>
          <FormControlErrorText>{errors.password}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <Text fontWeight="bold" fontSize="$sm">
        Forgot your password?{" "}
        <Link href={"/ForgotPassword"} asChild>
          <Text fontWeight="bold" color="#1890FF" fontSize="$sm">
            Reset it now
          </Text>
        </Link>
      </Text>
      <Button
        size="lg"
        borderRadius="$lg"
        bg="#1890FF"
        mt="$10"
        flexDirection="row"
        alignItems="center"
        onPress={handleLogin}
        isDisabled={isMutating}
      >
        <HStack space="sm" alignItems="center">
          {isMutating && <Spinner size="small" />}
          <ButtonText>Log in</ButtonText>
          <ButtonIcon as={ChevronRightIcon} h="$7" w="$7" strokeWidth={3} />
        </HStack>
      </Button>
    </>
  );
}
