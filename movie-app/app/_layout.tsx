import { Stack } from "expo-router";
import './globals.css';
import { StatusBar } from "react-native";
export default function RootLayout() {
  return(
    <>
      <StatusBar hidden={true}/>

        <Stack>
        {/*  Layout children must be of type Screen, all other children are ignored. 
        To use custom children, create a custom <Layout />.
        Update Layout Route at: "app/_layout" */}
          {/* hide the status bar : https://reactnative.dev/docs/statusbar */}
          {/* <StatusBar hidden={true}/> */}
          {/* {/* Hiding the (tabs) from (tabs)/index from the top bar */}
          <Stack.Screen
            name="(tabs)"
            // https://reactnavigation.org/docs/stack-navigator/
            //https://reactnavigation.org/docs/headers?config=dynamic
            // https://docs.expo.dev/versions/latest/sdk/router/
            options={{ headerShown: false}}
          >
          </Stack.Screen>

          <Stack.Screen
            name="movie/[id]"
            //https://reactnavigation.org/docs/headers?config=dynamic
            // https://reactnavigation.org/docs/stack-navigator/
            // https://docs.expo.dev/versions/latest/sdk/router/
            options={{ headerShown: false}}
          >
          </Stack.Screen>
        </Stack>

    </>
  
  );

}
