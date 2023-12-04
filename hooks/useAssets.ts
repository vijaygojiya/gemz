import { AssetsUrl } from "../constants/strings";
import { postJsonFetcher } from "../lib/fetcher";

import useMutation from "./useMutation";

import { type SWRMutationConfiguration } from "swr/mutation";

export function useAssetsMutation<ExtraArgs, Data>(
  key: string,
  config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>,
) {
  console.log("API is being called", key);
  return useMutation<ExtraArgs, Data>(key, postJsonFetcher(AssetsUrl), config);
}
