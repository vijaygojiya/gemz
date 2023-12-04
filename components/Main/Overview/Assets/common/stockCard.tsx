import React from "react";
import { Box, Text } from "@gluestack-ui/themed";

import { boxElevation } from "./utils";

const TableDataItem = ({ text }: any) => (
  <Text
    fontWeight="400"
    fontSize={12}
    lineHeight={28}
    textAlign="left"
    fontFamily="Roboto"
    letterSpacing={0.44}
    textTransform="capitalize"
    numberOfLines={1}
  >
    {text}
  </Text>
);

export const StockCard = ({
  units,
  company,
  costPrice,
  marketPrice,
  costValue,
  currentValue,
  returns,
  currency,
}: any) => {
  return (
    <Box
      style={boxElevation}
      mb={11}
      bg={"$white"}
      pt={6}
      pr={16}
      pb={9}
      pl={28}
      borderRadius={8}
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Text
          fontFamily="Roboto"
          fontWeight="400"
          fontSize={16}
          lineHeight={28}
          letterSpacing={0.44}
          textTransform="uppercase"
        >
          {company}
        </Text>
        <Box>
          <Text
            textAlign="right"
            fontFamily="Roboto"
            fontWeight="400"
            fontSize={16}
            lineHeight={28}
            letterSpacing={0.44}
          >
            $45,567
          </Text>
          <Text
            color="#4CAF50"
            fontFamily="Roboto"
            fontWeight="400"
            fontSize={14}
            lineHeight={20}
            letterSpacing={0.25}
            textAlign="right"
          >
            +2.87%
          </Text>
        </Box>
      </Box>
      <Box flex={1} flexDirection="row" justifyContent="space-between" mt={9}>
        <Box width="25%">
          <TableDataItem text="units held" />
          <TableDataItem text={units} />
        </Box>
        <Box width="25%">
          <TableDataItem text="cost price" />
          <TableDataItem text={currency + " " + costPrice} />
        </Box>
        <Box width="25%">
          <TableDataItem text="market price" />
          <TableDataItem text={currency + " " + marketPrice} />
        </Box>
      </Box>
      <Box flex={1} flexDirection="row" justifyContent="space-between" mt={9}>
        <Box width="25%">
          <TableDataItem text="cost value" />
          <TableDataItem text={currency + " " + costValue} />
        </Box>
        <Box width="25%">
          <TableDataItem text="current value" />
          <TableDataItem text={currency + " " + currentValue} />
        </Box>
        <Box width="25%">
          <TableDataItem text="returns" />
          <TableDataItem text={`${parseInt(returns)}%`} />
        </Box>
      </Box>
    </Box>
  );
};
