# Project Setup and Configuration

## Fork the Repository and Create a Pull Request

1. Begin by forking the repository.
2. After forking, initiate the pull request process.

## Authentication Code Modification

3. Disable authentication by commenting out the relevant code in `/app/(tabs)/index.tsx`:

```jsx
// Comment the authentication code
// const { getTokenFromSecureStore } = useContext(AuthContext);

// const initializeAuthState = async () => {
//   const accessToken = await getTokenFromSecureStore("accessToken");
//   if (!accessToken) {
//     router.replace("/(auth)/Onboarding");
//   }
// };

// useEffect(() => {
//   initializeAuthState();
// }, []);
```

## Environment Variable Configuration

4. Create a `.env.local` file with the following keys:

```plaintext
EXPO_PUBLIC_TRANSACTION_SERVER_URL= "https://demo-transaction.ethan-ai.com/"
EXPO_PUBLIC_ANALYTICS_SERVER_URL= "https://demo-transaction.ethan-ai.com/"
```

## Integration of GlueStack and Victory Chart

5. Utilize [GlueStack](https://gluestack.io/) and [Victory Chart](https://formidable.com/open-source/victory/) for enhanced functionality.

## SWR for API Calls

6. For efficient API calls, leverage SWR. A wrapper around SWR has been provided in the `hooks` folder, including mutation support.

**Note:** Ensure that you follow these steps meticulously to set up and configure the project successfully. If you encounter any issues, refer to the documentation or seek assistance from the project contributors.