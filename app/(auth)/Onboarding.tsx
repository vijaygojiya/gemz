import React from "react";
import { Link } from "expo-router";
import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronRightIcon,
  Heading,
  Text,
  View,
} from "@gluestack-ui/themed";

import Illustration from "../../assets/images/onboardingscreen2.svg";

import Onboarding, { type DotProps } from "react-native-onboarding-swiper";

const CustomDot = ({ selected }: DotProps) => (
  <View
    style={{
      width: 7,
      height: 7,
      marginHorizontal: 3,
      backgroundColor: selected ? "#1890FF" : "transparent",
      borderRadius: 4,
      borderColor: "black",
      borderWidth: 1,
    }}
  />
);

const pages = [
  {
    title: (
      <Heading mb="$4" size="3xl">
        GemZ App
      </Heading>
    ),
    subtitle: (
      <Text bold textAlign="justify">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
        eius pariatur error tempore perspiciatis laudantium itaque atque odit,
        placeat sint.
      </Text>
    ),
    backgroundColor: "#fff",
    image: <Illustration />,
  },
  {
    title: "Send Messages",
    subtitle: "You can reach everybody with us",
    backgroundColor: "#fff",
    image: <Illustration />,
  },
  {
    title: "That's Enough",
    subtitle: (
      <Link href={"/Login"} asChild>
        <Button mt="$40" size="lg" borderRadius="$xl" bg="#1890FF">
          <ButtonText>Get Started</ButtonText>
          <ButtonIcon as={ChevronRightIcon} h="$6" w="$6" ml="$2" />
        </Button>
      </Link>
    ),
    backgroundColor: "#fff",
    image: <Illustration />,
  },
];

export default function onBoarding() {
  return (
    <Onboarding
      imageContainerStyles={{ paddingBottom: 0 }}
      containerStyles={{ paddingHorizontal: 15 }}
      bottomBarColor="#fff"
      showDone={false}
      showSkip={false}
      showNext={false}
      DotComponent={CustomDot}
      pages={pages}
    />
  );
}
