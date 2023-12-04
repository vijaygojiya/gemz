import React from "react";
import { FlatList, Spinner } from "@gluestack-ui/themed";

import { useTransactionServerQuery } from "../../../../../hooks/useQuery";

import VaultsCard from "./VaultsCard";

export interface IStatements {
  count: number;
  next: null | string;
  previous: null | string;
  results: IBankStatement[];
}

export interface IBankStatement {
  client: string;
  client_name: string;
  created_at: string;
  custodian: string;
  custodian_name: string;
  id: string;
  modified_at: string;
  portfolio_number: null | string;
  relationship_number: string;
  reporting_currency: null | string;
  s3_url: string;
  statement_date: string;
  statement_type: string;
  status: string;
  upload_date: string;
}

const VaultzList = () => {
  const { data, isLoading } =
    useTransactionServerQuery<IStatements>("/statement/bank/");
  if (isLoading) {
    return <Spinner size="small" />;
  }
  return (
    <FlatList
      data={data?.results}
      renderItem={({ item }: { item: IBankStatement }) => {
        return <VaultsCard results={item} />;
      }}
      keyExtractor={(item: IBankStatement) => item.id}
    />
  );
};

export default VaultzList;
