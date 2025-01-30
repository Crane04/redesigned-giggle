import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
// import Home from "./src/screens/Home";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";
import Profile from "./src/screens/Profile";
import { AuthProvider } from "./src/contexts/AuthContext";
import Splash from "./src/screens/Splash";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { ShadowsIntoLight_400Regular } from "@expo-google-fonts/shadows-into-light";

const Stack = createNativeStackNavigator();

const App = () => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
    Pacifico_400Regular,
    ShadowsIntoLight_400Regular,
  });

  // Manage splash screen visibility
  useEffect(() => {
    const prepareSplashScreen = async () => {
      if (!fontsLoaded) {
        await SplashScreen.preventAutoHideAsync(); // Keep splash screen visible
      } else {
        await SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
      }
    };
    prepareSplashScreen();
  }, [fontsLoaded]);

  // Fallback UI while fonts are loading
  if (!fontsLoaded) {
    return null; // Or a custom loading component
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ title: "Sign Up", headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Sign Up", headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "Sign In", headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
