import React, { useEffect } from "react";
import { Box, Text } from "@gluestack-ui/themed";

import { useStocksMutation } from "../../../../../hooks/useStocks";

import { Loading } from "./loading";
import { StockCard } from "./stockCard";
import { boxElevation } from "./utils";

export const Stocks = () => {
  const { trigger, isMutating, data } = useStocksMutation<any, any>(
    "/position/history/security_details/",
    {
      onSuccess: (_data) => {
        console.log("Data calling API", data);
      },
      onError: (_data) => {
        console.log("Error calling API", _data);
      },
    },
  );

  useEffect(() => {
    trigger({
      report_date: "dummy",
    });
  }, []);

  return isMutating ? (
    <Loading />
  ) : (
    <Box>
      <Text
        mt={18}
        textAlign="center"
        mb={14}
        fontWeight="500"
        fontSize={20}
        lineHeight={28}
      >
        Krish’s Stocks Portfolios
      </Text>
      <Box
        bgColor="#fff0f0"
        minHeight={193}
        style={boxElevation}
        mb={11}
        borderRadius={8}
      >
        <Box
          bg="$white"
          p={42}
          borderRadius={8}
          borderBottomLeftRadius={200}
          borderBottomRightRadius={200}
        >
          <Box flexDirection="row" alignItems="flex-end" ml="auto">
            <Text
              fontWeight="400"
              fontSize={48}
              lineHeight={57}
              textAlign="center"
              fontFamily="Roboto"
            >
              $22,049
            </Text>
            <Text
              fontWeight="400"
              fontSize={14}
              lineHeight={20}
              textAlign="center"
              fontFamily="Roboto"
              color="#4CAF50"
              letterSpacing={0.25}
              mb={12}
              ml={2}
            >
              +22.87%
            </Text>
          </Box>
          <Text
            fontWeight="400"
            fontSize={16}
            lineHeight={24}
            textAlign="center"
            fontFamily="Roboto"
            letterSpacing={0.15}
          >
            Portfolio Balance
          </Text>
        </Box>
      </Box>

      {(data || []).map(
        ({
          quantity,
          client_name,
          cost_value,
          market_value,
          mtm_price,
          current_value,
          daily_returns,
          currency,
        }: any) => (
          <StockCard
            units={quantity}
            company={client_name}
            costPrice={parseFloat(market_value).toFixed(2)}
            marketPrice={parseFloat(mtm_price).toFixed(2)}
            costValue={parseFloat(cost_value).toFixed(2)}
            currentValue={parseFloat(current_value).toFixed(2)}
            returns={daily_returns}
            currency={currency}
            key={cost_value}
          />
        ),
      )}
    </Box>
  );
};
