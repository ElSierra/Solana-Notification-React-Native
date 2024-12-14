import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
  AppState,
  AppStateStatus,
  PermissionsAndroid,
  Platform,
  useWindowDimensions,
  View,
} from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";
import { SplashScreenView } from "./src/SplashScreen";
import Main from "./src/Main";
import { StatusBar } from "expo-status-bar";

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { useAnimationFinished } from "./src/store/ui";
import Animated, {
  configureReanimatedLogger,
  FadeIn,
  ReanimatedLogLevel,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryClient } from "./src/util/queryClient";
import { LogLevel, OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { SystemBars } from "react-native-edge-to-edge";
import { useIsDarkMode } from "./src/hooks/getMode";
import SystemNavigationBar from "react-native-system-navigation-bar";
import { useAuth, useIsFingerPrintSuccess } from "./src/store/auth";
import { FingerPrint } from "./src/screen/FingerPrint";

enableFreeze(true);
GoogleSignin.signInSilently().then((user) => {
  console.log(user);
});
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});
SystemNavigationBar.setNavigationColor("transparent");

// OneSignal.Debug.setLogLevel(LogLevel.Verbose);
// OneSignal.initialize(Constants?.expoConfig?.extra?.oneSignalAppId);
console.log(process.env.EXPO_PUBLIC_API_URL);
// // Also need enable notifications to complete OneSignal setup
// OneSignal.Notifications.requestPermission(true);
export default function App() {
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const translateY = useSharedValue(-height);
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
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(
    () => appState?.current
  );

  const setIsFingerPrint = useIsFingerPrintSuccess(
    (state) => state.setFingerPrintSuccess
  );

  const isFingerPrint = useIsFingerPrintSuccess(
    (state) => state.isFingerPrintSuccess
  );
  const user = useAuth((state) => state.user);

  function onAppStateChange(status: AppStateStatus) {
    // if (Platform.OS !== "web") {
    //   focusManager.setFocused(status === "active");
    // }
  }

  const fingerPrintStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.Notifications.requestPermission(true);

    OneSignal.initialize(process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID as string);
    // Handle notification received

    const subscriptionBackground = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("App has come to the foreground!");
        }

        //setIsFingerPrint(false);
        setAppStateVisible(appState.current);

        appState.current = nextAppState;

        console.log("AppState", appState.current);
      }
    );
    return () => {
      subscription.remove();
      subscriptionBackground.remove();
    };
  }, []);

  useEffect(() => {
    if (appStateVisible == "background") {
      setIsFingerPrint(false);
    }
  }, [appStateVisible]);

  const [appIsReady, setAppIsReady] = useState(false);
  const { width: windowWith, height: windowHeight } = useWindowDimensions();
  const dark = useIsDarkMode();
  const setAnimationFinished = useAnimationFinished(
    (state) => state.setAnimationFinished
  );
  const animationFinished = useAnimationFinished(
    (state) => state.animationFinished
  );
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

  const style = dark ? "light" : "dark";

  return (
    <>
      <SystemBars style={style} />
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: "black" }}
        onLayout={onLayoutRootView}
      >
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
              height: windowHeight + top + bottom,
              width: windowWith,
            }}
          >
            <SplashScreenView finishAnimation={onAnimationFinish} />
          </View>
        )}

        {(!isFingerPrint && user?.name) &&(
          <Animated.View
            style={[
              {
                position: "absolute",
                zIndex:9,
                height: windowHeight + top + bottom,
                width: windowWith,
              },
            ]}
          >
            <FingerPrint />
          </Animated.View>
        )}
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </>
  );
}
