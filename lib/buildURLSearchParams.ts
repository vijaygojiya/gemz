import { isString, pickBy } from "lodash";

export default function buildURLSearchParams(
  params?: Record<string, string | null | undefined> | string,
) {
  const urlSearchParams = new URLSearchParams(
    typeof params === "string" ? params : pickBy(params, isString),
  );
  // urlSearchParams.sort();
  return urlSearchParams.toString() ? `?${urlSearchParams}` : "";
}
// import queryString from 'query-string';

// export default function buildURLSearchParams(params:any) {
//   return `?${queryString.stringify(params)}`;
// }
