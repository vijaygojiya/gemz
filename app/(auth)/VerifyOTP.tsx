import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import OtpIllustration from "../../assets/images/otp-illustration.svg";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useAuthServerMutation } from "../../hooks/useMutation";
import buildURLSearchParams from "../../lib/buildURLSearchParams";

const OTP_WAIT_TIME = 60;

export default function VerifyOTP() {
  const [seconds, setSeconds] = useState(OTP_WAIT_TIME);
  const [otpValues, setOtpValues] = useState(Array(6).fill("")); // State to store OTP values

  const { phone_number, user_id, next_path } = useLocalSearchParams();

  const { trigger, isMutating } = useAuthServerMutation<any, any>(
    "/verify-otp",
    {
      onSuccess(data) {
        if (data.access_token) {
          // ToastAndroid.show("OTP Send", ToastAndroid.SHORT);
          // ${buildURLSearchParams({
          //   phone_number: data.phone_number,
          //   user_id: data.user_id.toString(),
          //   next_path: "/ResetPassword",
          // })}`
          router.push(`${next_path}${buildURLSearchParams({
            access_token: data.access_token
          })}` as any);
        }
      },
      onError() {
        // ToastAndroid.show("OTP Send", ToastAndroid.SHORT);
      },
    }
  );
  const resendOTPEnabled = seconds === 0;
  const inputRefs = Array(6)
    .fill(null)
    .map(() => useRef<TextInput | null>(null));

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (index: number, val: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = val;
    setOtpValues(newOtpValues);

    if (val.length >= 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1]?.current?.focus();
    } else if (val.length < 1 && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  function resendOtp() {
    setSeconds(OTP_WAIT_TIME);
    if (!resendOTPEnabled) return;
  }

  const handleSubmit = () => {
    trigger({
      otp: otpValues.join(""),
      user_id,
    });
  };

  return (
    <Box h="100%" justifyContent="center" p="$6">
      <VStack space="3xl" reversed={false}>
        <Heading textAlign="center" size="xl">
          OTP Verification
        </Heading>
        <Center>
          <OtpIllustration />
        </Center>
        <HStack space="sm" reversed={false} justifyContent="center">
          {inputRefs.map((inputRef, index) => (
            <TextInput
              key={index}
              ref={inputRef}
              style={styles.inputView}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(val) => handleInputChange(index, val)}
            />
          ))}
        </HStack>
        <Text textAlign="center" fontWeight="bold">
          Didn&apos;t receive OTP?{" "}
          <Text
            onPress={resendOtp}
            color={resendOTPEnabled ? "#1890FF" : "grey"}
            fontWeight="bold"
          >
            Resend Code
            {resendOTPEnabled
              ? ""
              : ` (0:${seconds.toString().padStart(2, "0")})`}
          </Text>
        </Text>
        <Button
          size="lg"
          borderRadius="$lg"
          bg="#1890FF"
          onPress={() => handleSubmit()}
        >
          <ButtonText>Verify</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  inputView: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
