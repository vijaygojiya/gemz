interface IFetcherParams {
  url: string;
  init: RequestInit;
  error: string;
}

async function fetcher({ url, init, error }: IFetcherParams) {
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        "Accept-Encoding": "gzip",
        //   {
        //     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNDg2MTk3LCJpYXQiOjE3MDA0ODI1OTcsImp0aSI6ImQwYzY1MzFmN2VmZTQyNWJhZjVhNTI2OWNkNjM3YzRlIiwidXNlcl9pZCI6NTR9.v9D4yKtBrAZOjn1UwSfby5IgCgtu-dYhepFdypJcErQ",
        //     "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMDU2ODk5NywiaWF0IjoxNzAwNDgyNTk3LCJqdGkiOiIyZTZiMDM4NTYwNTY0ODI0ODYzYmNkYjAzYmZlZTdmZSIsInVzZXJfaWQiOjU0fQ.O-dvBfwNv6I7eEDC7_szjto1qY7koVdpEzbCWH_euIE"
        // }
        Authorization: "Token c48ba34430ee8fedb986c15b31cf5e8cbf33acf1",
        // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNDg2MTk3LCJpYXQiOjE3MDA0ODI1OTcsImp0aSI6ImQwYzY1MzFmN2VmZTQyNWJhZjVhNTI2OWNkNjM3YzRlIiwidXNlcl9pZCI6NTR9.v9D4yKtBrAZOjn1UwSfby5IgCgtu-dYhepFdypJcErQ",
        ...init.headers,
      },
    });

    if (res.headers.get("Content-Type") === "text/csv") {
      return await res.text();
    }

    let json;

    try {
      json = await res.json();
    } catch {
      json = {};
    }

    if (res.ok) return json;

    throw new Error(json.error || Object.values(json).join(", "));
  } catch (e) {
    if (e instanceof Error && e.message) {
      throw e;
    } else {
      throw new Error(error);
    }
  }
}

function formatBody<ExtraArgs>(
  arg: ExtraArgs,
  payload?: Record<string, string>,
) {
  if (arg) {
    return JSON.stringify(arg);
  }
  if (payload) {
    return JSON.stringify(payload);
  }
  return undefined;
}

export function postJsonFetcher(baseURL: string) {
  return async <ExtraArgs>(
    key: string | [string, Record<string, string>],
    options?: Readonly<{ arg: ExtraArgs }>,
  ) => {
    const isArray = Array.isArray(key);
    return await fetcher({
      url: baseURL + (isArray ? key[0] : key),
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formatBody(options?.arg, isArray ? key[1] : undefined),
      },
      error: "An error occurred while posting the data.",
    });
  };
}

export function getFetcher(baseURL: string) {
  return async (key: string | [string, string]) =>
    await fetcher({
      url: baseURL + (Array.isArray(key) ? key[0] : key),
      init: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      error: "An error occurred while getting the data.",
    });
}
