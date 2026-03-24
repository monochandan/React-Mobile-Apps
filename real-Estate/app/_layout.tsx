import { Stack } from "expo-router";
import "./global.css";
import {useFonts} from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import GlobalProvider from "@/lib/global-provider";

// https://docs.expo.dev/router/basics/core-concepts/
export default function RootLayout() {
  const [fontLoad] = useFonts({
    // fonts
    "Rubik-Bold":require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-Regular":require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-ExtraBold":require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light":require('../assets/fonts/Rubik-Light.ttf'),
    "Rubik-Medium":require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-SemiBold":require('../assets/fonts/Rubik-SemiBold.ttf'),

    // colors
    

    // primary: {
    //       100: "#0061FF0A",
    //       200: "#0061FF1A",
    //       300: "#0061FF",
    //     },
    //     accent: {
    //       100: "#FBFBFD",
    //     },
    //     black: {
    //       DEFAULT: "#000000",
    //       100: "#8C8E98",
    //       200: "#666876",
    //       300: "#191D31",
    //     },
    //     danger: "#F75555",

  });
  
  useEffect(() =>{
    // if font is loaded, hide the splash screen and continue to the app
    SplashScreen.hideAsync();
  },[fontLoad]);

  // if not loaded
  if(!fontLoad) return null;

  // hide the navbar on top
  return (
    // every single screen will have the access of the data which is within the global provider
      <GlobalProvider>
           <Stack  screenOptions={{headerShown: false}}/>;
      </GlobalProvider>
  ) 
  
  
}
