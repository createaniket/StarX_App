import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Homescreen";
import ScanScreen from "../screens/ScanScreen";
import WalletScreen from "../screens/WalletScreen";
import HistoryScreen from "../screens/HistoryScreen";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen"; // ✅ add this
import UserProfileScreen from "../screens/UserProfileScreen";


import { useAuthStore } from "../store/useAuthStore";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Scan: undefined;
  Wallet: undefined;
  History: undefined;
    Profile: undefined; // ✅ add
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { token, hydrate, isLoading } = useAuthStore();

  useEffect(() => {
    hydrate(); // ✅ app open pe token load karega
  }, []);

  // ✅ Splash while checking token
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
           <Stack.Screen name="Profile" component={UserProfileScreen} /> 
        </>
      )}
    </Stack.Navigator>
  );
}
