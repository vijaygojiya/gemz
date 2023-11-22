import React, { createContext, useState, useEffect, useCallback } from "react";
import { Alert, AppState, AppStateStatus } from "react-native";
import { decode } from "base-64";
import { useAuthServerMutation } from "../hooks/useMutation";

const AuthContext = createContext<any>(null);
const { Provider } = AuthContext;

const REFRESH_OFFSET = 300;

const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  });

  const getTimeoutFromToken = (token: string): number => {
    try {
      // Extract the payload part of the JWT token
      const payloadBase64 = token.split(".")[1];

      // Decode the payload using base-64 decoding
      const decodedPayload = decode(payloadBase64);

      // Parse the decoded payload as JSON
      const decodedToken: any = JSON.parse(decodedPayload);

      const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
      return expirationTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return 0; // Return 0 or some default value in case of an error
    }
  };

  const { trigger } = useAuthServerMutation<any, any>("/token/refresh/", {
    onSuccess(data: any) {
      const accessToken = data.access;
      if (accessToken) {
        setAuthState((prevAuthState) => ({
          ...prevAuthState,
          accessToken,
        }));
      }
    },
    onError() {
      Alert.alert("Error", "Failed to fetch the access token.");
    },
  });

  const refresh = useCallback(async () => {
    await trigger({ refresh: authState.refreshToken });
  }, [trigger, authState.refreshToken]);

  const logout = useCallback((msg?: string) => {
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
    if (msg) {
      Alert.alert("Info", msg);
    }
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        nextAppState === "active" &&
        !authState.accessToken &&
        authState.refreshToken
      ) {
        refresh();
      }
    };

    const appStateSubscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      // Remove the subscription manually
      appStateSubscription.remove();
    };
  }, [refresh, authState]);

  const isLoggedIn = Boolean(authState.refreshToken);

  useEffect(() => {
    if (authState.accessToken) {
      try {
        const accessTimeout = setTimeout(
          refresh,
          Math.max(
            getTimeoutFromToken(authState.accessToken) - REFRESH_OFFSET,
            0
          )
        );
        return () => {
          clearTimeout(accessTimeout);
        };
      } catch {
        // Do nothing
      }
    }
    if (authState.refreshToken) {
      refresh();
    }
    return () => undefined;
  }, [refresh, authState]);

  useEffect(() => {
    if (authState.refreshToken) {
      try {
        const refreshTimeout = setTimeout(
          () => logout("Session expired. Please log in again."),
          getTimeoutFromToken(authState.refreshToken)
        );
        return () => {
          clearTimeout(refreshTimeout);
        };
      } catch (error) {
        logout();
      }
    }
    return () => undefined;
  }, [authState.refreshToken, logout]);

  return (
    <Provider
      value={{
        authState,
        getAccessToken: () => authState.accessToken,
        setAuthState,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
