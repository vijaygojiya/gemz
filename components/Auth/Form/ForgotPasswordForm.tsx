import React, { useState } from "react";
import { router } from "expo-router";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
  ChevronRightIcon,
  FormControl,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "@gluestack-ui/themed";

import { useAuthServerMutation } from "../../../hooks/useMutation";
import buildURLSearchParams from "../../../lib/buildURLSearchParams";

import { User } from "lucide-react-native";

interface IUserArgs {
  username: string;
}
interface ILoginResponse {
  user_id: number;
  phone_number: string;
  message?: string;
}

const ForgotPasswordForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({
    username: "",
  });
  const { trigger, isMutating } = useAuthServerMutation<
    IUserArgs,
    ILoginResponse
  >("/forgot-password", {
    onSuccess(data) {
      if (data.user_id) {
        setCredentials({ username: "" });
        setErrors({ username: "" });
        // ToastAndroid.show("OTP Send", ToastAndroid.SHORT);
        router.push(
          `/VerifyOTP${buildURLSearchParams({
            phone_number: data.phone_number,
            user_id: data.user_id.toString(),
            next_path: "/ResetPassword",
          })}`,
        );
      }
    },
  });

  function validateForm() {
    const newErrors = {
      username: "",
    };
    if (!credentials.username) {
      newErrors.username = "Username is required";
    }
    setErrors(newErrors);
    return newErrors.username === "";
  }

  const handleReset = () => {
    if (validateForm()) {
      trigger(credentials);
    }
  };

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
            placeholder="Enter Username"
            fontSize="$md"
            onChangeText={(val: string) => {
              handleChange("username", val);
            }}
          />
        </Input>
      </FormControl>
      <Button
        size="lg"
        borderRadius="$lg"
        bg="#1890FF"
        mt="$10"
        flexDirection="row"
        alignItems="center"
        onPress={() => {
          handleReset();
        }}
        isDisabled={isMutating}
      >
        <HStack space="sm" alignItems="center">
          {isMutating && <ButtonSpinner size="small" />}
          <ButtonText>Proceed</ButtonText>
          <ButtonIcon as={ChevronRightIcon} h="$7" w="$7" strokeWidth={3} />
        </HStack>
      </Button>
    </>
  );
};

export default ForgotPasswordForm;
