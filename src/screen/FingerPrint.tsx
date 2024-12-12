import {
  View,
  Text,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { FingerPrintIcon } from "../components/global/icons";
import LinearBackground from "../components/global/LinearBackground";
import { Theme } from "../constants/Theme";
import AnimatedCircularProgress from "../components/global/circular-progress/CircularProgressBar";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useAuth, useIsFingerPrintSuccess } from "../store/auth";
import { Image } from "expo-image";
import { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import * as LocalAuthentication from "expo-local-authentication";
import { useIsDarkMode } from "../hooks/getMode";
export const FingerPrint = () => {
  const { width, height } = useWindowDimensions();
  const [value, setValue] = useState(10);
  const animate = useSharedValue(false);
  const setFingerPrint = useIsFingerPrintSuccess(
    (state) => state.setFingerPrintSuccess
  );
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const doStuff = () => {
    LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
    }).then((res) => {
      console.log(
        "🚀 ~ file: index.tsx:151 ~ LocalAuthentication.authenticateAsync ~ res",
        res
      );
      setFingerPrint(true);
    });
  };
  const tap = Gesture.Tap()
    .onBegin(() => {
      "worklet";
      scale.value = withTiming(0.5);
      console.log("Tapped");
    })
    .onStart(() => {
      "worklet";

      runOnJS(setValue)(100);
      console.log("Started");
      runOnJS(doStuff)();
    })
    .onEnd(() => {
      "worklet";
      scale.value = withTiming(1);
      console.log("Ended");
    })
    .onFinalize(() => {
      "worklet";

      scale.value = withTiming(1);
      console.log("Finalized");
    });

  const user = useAuth((state) => state.user);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const emojiAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useAnimatedReaction(
    () => {},
    () => {
      translateY.value = withRepeat(withTiming(30), -1, true);
    }
  );

  const dark = useIsDarkMode();
  const textColor = dark ? "white" : "black";
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LinearBackground />

      <Animated.View
        style={[{ position: "absolute", top: height / 3 }, emojiAnim]}
      >
        <Text
          style={{
            fontFamily: "windows",
            fontSize: 40,
          }}
        >
          👇
        </Text>
      </Animated.View>
      <View
        style={{
          position: "absolute",
          top: 0,
          paddingTop: 80,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Image
          source={user?.picture}
          style={{ width: 40, height: 40, borderRadius: 999 }}
        />
        <Text
          style={{
            color: textColor,

            fontSize: 14,
            textAlign: "center",
            fontFamily: Theme.fonts.SatoshiBold,
          }}
        >
          {`Hi, ${user?.name.split(" ")[0]}`}
        </Text>
      </View>
      <View style={{ position: "absolute" }}>
        <AnimatedCircularProgress percentage={value} color={textColor}/>
      </View>
      <GestureDetector gesture={tap}>
        <Animated.View style={style}>
          <FingerPrintIcon size={100} color={textColor} />
        </Animated.View>
      </GestureDetector>

      <View style={{ position: "absolute", bottom: 0, padding: 40 }}>
        <Text
          style={{
            color: textColor,

            fontSize: 14,
            textAlign: "center",
            fontFamily: Theme.fonts.SatoshiBold,
          }}
        >
          {"Tap above to authenticate\n And access your wallet"}
        </Text>
      </View>
    </View>
  );
};
