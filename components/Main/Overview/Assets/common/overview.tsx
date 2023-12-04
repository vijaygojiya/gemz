import React, { useEffect } from "react";
import { Box } from "@gluestack-ui/themed";

import { useAssetsMutation } from "../../../../../hooks/useAssets";

import { AssetCard } from "./assetCard";
import { AssetsPieChart } from "./assetsPieChart";
import { Loading } from "./loading";
import { boxElevation } from "./utils";

export const Overview = () => {
  const { trigger, isMutating, data } = useAssetsMutation<any, any>(
    "/gross-allocation",
    {
      onSuccess: (_data) => {
        console.log("Data calling API", data[0]!.data);
      },
      onError: (_data) => {
        console.log("Error calling API", _data);
      },
    },
  );

  useEffect(() => {
    trigger({
      client_id: "dummy",
      custodian_id: "dummy",
      start_date: "dummy",
      end_date: "dummy",
    });
  }, []);

  const calculateTotal = (total: any, num: any) => {
    return Math.abs(total.value ? total.value : total) + Math.abs(num.value);
  };

  const dataToVisualize = data ? data[0]!.data : [{}];
  const totalAmount = dataToVisualize?.reduce(calculateTotal);

  return (
    <Box>
      {isMutating ? (
        <Loading />
      ) : (
        <>
          <Box
            p={33}
            pb={0}
            bg="$white"
            my={16}
            style={boxElevation}
            borderRadius={6}
          >
            <AssetsPieChart data={dataToVisualize} total={totalAmount} />
          </Box>
          {dataToVisualize.map((item: any) => (
            <AssetCard
              mb={16}
              title={item.type}
              value={parseInt(Math.abs(item.value) as any, 10)}
              total={totalAmount}
              key={item.value}
            />
          ))}
        </>
      )}
    </Box>
  );
};
