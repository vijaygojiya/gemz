import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
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

export default function Login() {
  const [email,setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  function handleVisibility() {
    setShowPassword(!showPassword);
  }

  function handleLogin() {
    console.warn("Email:", email);
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
        <Input
          size="xl"
          borderRadius="$lg"
          borderWidth="$2"
          borderColor="black"
        >
          <InputSlot pl="$3">
            <InputIcon as={User} color="black" />
          </InputSlot>
          <InputField placeholder="email" fontSize="$md" onChangeText={(val:string) => setEmail(val)}/>
        </Input>
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
