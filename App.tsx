import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { SplashScreenView } from "./src/SplashScreen";
import Main from "./src/Main";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

import { StatusBar as RStatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TransparentCircleOverlay } from "./src/components/Home/Cicrle";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableFreeze } from "react-native-screens";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
enableFreeze(true);
export default function App() {
  const [loaded, error] = useFonts({
    "noto": require("./assets/fonts/NotoColorEmoji.ttf"),
    "windows": require("./assets/fonts/windows.ttf"),
    "salmond-light": require("./assets/fonts/Salmond-Light.ttf"),
    "salmond-semibold": require("./assets/fonts/Salmond-Semibold.ttf"),
    "satoshi-light": require("./assets/fonts/Satoshi-Light.otf"),

    "satoshi-regular": require("./assets/fonts/Satoshi-Regular.otf"),
    "satoshi-medium": require("./assets/fonts/Satoshi-Medium.otf"),
    "satoshi-bold": require("./assets/fonts/Satoshi-Bold.otf"),
    "satoshi-black": require("./assets/fonts/Satoshi-Black.otf"),
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
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
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
