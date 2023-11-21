import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthServerMutation } from "../hooks/useMutation";
import { get, save, remove } from "../lib/secureStorage";

// Response interfaces
interface ITokenRefreshArgs {
  refresh: string;
}

interface ITokenRefreshResponse {
  access: string;
}

// Utility function to check if a token is expired
function isTokenExpired(token: string) {
  const decodedToken = jwtDecode(token);
  const expiry = decodedToken.exp;
  return expiry ? expiry < Date.now() / 1000 : false;
}

// Auth context to be used throughout the app
const AuthContext = createContext({
  isLoggedIn: false,
  refreshTokens: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to refresh tokens
  const refreshTokens = useCallback(async () => {
    const refreshToken = await get("refreshToken");
    if (!refreshToken || isTokenExpired(refreshToken)) {
      await logout();
      // setIsLoggedIn(false);
      return;
    }

    const { trigger } = useAuthServerMutation<
      ITokenRefreshArgs,
      ITokenRefreshResponse
    >("/token/refresh/", {
      onSuccess(data) {
        const newAccessToken = data.access;
        if (newAccessToken) {
          save("accessToken", newAccessToken);
          // setIsLoggedIn(true);
        }
      },
      onError() {
        console.log("Failed to fetch the access token.");
      },
    });

    trigger({ refresh: refreshToken });
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    await remove("accessToken");
    await remove("refreshToken");
    // setIsLoggedIn(false);
  }, []);

  // Check token validity on app start and set login state
  useEffect(() => {
    (async () => {
      const accessToken = await get("accessToken");
      const refreshToken = await get("refreshToken");
      if (accessToken && !isTokenExpired(accessToken) && refreshToken) {
        // setIsLoggedIn(true);
      } else if (refreshToken && !isTokenExpired(refreshToken)) {
        await refreshTokens();
      } else {
        await logout();
      }
    })();
  }, [refreshTokens, logout]);

  const refresh_Token = get("refreshToken");


  const isLoggedIn = Boolean(refresh_Token);
  console.log(isLoggedIn,refreshTokens,"tokens")


  // Provide auth context values
  const value = {
    isLoggedIn,
    refreshTokens,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
