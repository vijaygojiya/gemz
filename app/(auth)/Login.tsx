import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import {
  User,
  Lock,
  EyeOffIcon,
  EyeIcon,
  ChevronRightIcon,
} from "lucide-react-native";
import { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { Link } from "expo-router";
import { useAuthServerMutation } from "../../hooks/useMutation";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({username: "", password: ""});

  const { trigger } = useAuthServerMutation("/login", {
    onSuccess: (data) => {
      setCredentials({ username: "", password: "" });
      setErrors({ username: '', password: '' });
    },
  });

  function handleVisibility() {
    setShowPassword(!showPassword);
  }

  function validateForm() {
    let newErrors = {
      username: "",
      password: "",
    };
    if (!credentials.username) {
      newErrors.username = "Username is required";
    }
    if(!credentials.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.values(newErrors).length === 0;
  }

  function handleLogin() {
    if(validateForm()){
      trigger(credentials);
    }
  }

  function handleChange(name: string, value: string) {
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  }

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
              placeholder="username"
              fontSize="$md"
              onChangeText={(val: string) => handleChange("username", val)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorText>
              {errors.username}
            </FormControlErrorText>
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
              type={showPassword ? "text" : "password"}
              placeholder="password"
              fontSize="$md"
              onChangeText={(val: string) => handleChange("password", val)}
            />
            <InputSlot pr="$3" onPress={handleVisibility}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          <FormControlError>
            <FormControlErrorText>
              {errors.password}
            </FormControlErrorText>
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
      </VStack>
      <Button
        size="lg"
        borderRadius="$lg"
        bg="#1890FF"
        mt="$10"
        flexDirection="row"
        alignItems="center"
        onPress={handleLogin}
      >
        <ButtonText>Log in</ButtonText>
        <ButtonIcon
          as={ChevronRightIcon}
          h="$7"
          w="$7"
          ml="$3"
          mt="$1"
          strokeWidth={3}
        />
      </Button>
    </Box>
  );
}
