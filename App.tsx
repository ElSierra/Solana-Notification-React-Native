import { useCallback, useLayoutEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";
import { SplashScreenView } from "./src/SplashScreen";
import Main from "./src/Main";
import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableFreeze } from "react-native-screens";
import {
  Canvas,
  Fill,
  Group,
  RadialGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();
// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
enableFreeze(true);
export default function App() {
  const [loaded, error] = useFonts({
    // noto: require("./assets/fonts/NotoColorEmoji.ttf"),
    // windows: require("./assets/fonts/windows.ttf"),
    // "salmond-light": require("./assets/fonts/Salmond-Light.ttf"),
    // "salmond-semibold": require("./assets/fonts/Salmond-Semibold.ttf"),
    // "satoshi-light": require("./assets/fonts/Satoshi-Light.otf"),
    // "satoshi-regular": require("./assets/fonts/Satoshi-Regular.otf"),
    // "satoshi-medium": require("./assets/fonts/Satoshi-Medium.otf"),
    // "satoshi-bold": require("./assets/fonts/Satoshi-Bold.otf"),
    // "satoshi-black": require("./assets/fonts/Satoshi-Black.otf"),
  });
  const [appIsReady, setAppIsReady] = useState(false);
  const { width: windowWith, height: windowHeight } = useWindowDimensions();
  const [animationFinished, setAnimationFinished] = useState(false);
  useLayoutEffect(() => {
    if (loaded) {
      setAppIsReady(true);
    }
  }, [loaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const onAnimationFinish = () => {
    setAnimationFinished(true);
  };

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: "black" }}
      onLayout={onLayoutRootView}
    >
      <SafeAreaProvider>
        <StatusBar
          animated={true}
          style={"dark"}
          backgroundColor="transparent"
        />
      
        {!animationFinished && (
          <View
            style={{
              position: "absolute",
              zIndex: 999,
              height: windowHeight + 40,
              width: windowWith,
            }}
          >
            <SplashScreenView finishAnimation={onAnimationFinish} />
          </View>
        )}

        <Main />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
