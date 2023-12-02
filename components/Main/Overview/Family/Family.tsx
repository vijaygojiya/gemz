import React, { useEffect, useState } from "react";
import { Spinner, VStack } from "@gluestack-ui/themed";

import {
  useAnalyticsServerMutation,
  useAnalyticsServerQuery,
} from "../../../../hooks/useMutation";

import FamilyHead from "./common/Head";
import FamilyInvestment from "./common/Investment";

export default function Family() {
  const [totalGainer, setTotalGainer] = useState<number>(0);
  const [pieChart, setPieChart] = useState<any>();
  const [netWorthCards, setNetWorthCards] = useState<any>({});

  const getTopGainer = useAnalyticsServerQuery("position/history/top_gainer", {
    onSuccess: (data: any[]) => {
      let totalGainer = 0;
      data.forEach((gainer) => {
        totalGainer += gainer.profit_loss;
      });
      setTotalGainer(totalGainer);
    },
  });

  const getChartData = useAnalyticsServerMutation("gross-allocation/", {
    onSuccess: (data: any[]) => {
      const temp = data[0];
      let total = 0;
      temp.data.forEach((v: any) => {
        total += v.value;
      });
      temp.total = total;
      setPieChart(temp);
    },
  });

  const getNetworthCards = useAnalyticsServerQuery(
    "statement/position/networth_cards",
    {
      onSuccess: (data: any) => {
        setNetWorthCards(data);
      },
    },
  );

  useEffect(() => {
    getChartData.trigger();
    getTopGainer.trigger();
    getNetworthCards.trigger();
  }, []);

  return (
    <VStack>
      {pieChart ? (
        <FamilyInvestment chartData={pieChart} totalGainer={totalGainer} />
      ) : (
        <Spinner size="medium" />
      )}
      {netWorthCards?.client_cards?.map((networth: any, index: number) => (
        <FamilyHead networth={networth} key={index} />
      ))}
    </VStack>
  );
}
