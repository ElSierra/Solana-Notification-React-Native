import { Image } from "expo-image";
import { Text, View } from "react-native";
import { Theme } from "../../constants/Theme";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useAuth } from "../../store/auth";
import { useIsDarkMode } from "../../hooks/getMode";
import { useState } from "react";
import { Loading } from "../global/Loading";
export const SignInGuest = () => {
  const scale = useSharedValue(1);
  const setAuth = useAuth((state) => state.setType);
  const isDarkMode = useIsDarkMode();
  const textColor = isDarkMode ? "white" : "black";
  const bg = !isDarkMode ? "black" : "white";
  const [clicked, setClicked] = useState(false);
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: scale.value }, { scaleY: scale.value }],
    };
  });
  const tap = Gesture.Tap()
    .onBegin((e) => {
      "worklet";
      scale.value = withSpring(0.9);
    })
    .onStart((e) => {
      "worklet";
      runOnJS(setAuth)("guest");
      runOnJS(setClicked)(true);
      scale.value = withSpring(1);
    });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        style={[
          {
            justifyContent: "center",
            flexDirection: "row",
            borderWidth: 2,
            borderColor: bg,
            padding: 20,
            borderRadius: 9999,
            width: "100%",
            gap: 10,
            alignItems: "center",
          },
          style,
        ]}
      >
        {!clicked ? (
          <Text
            style={{ color: textColor, fontFamily: Theme.fonts.SatoshiBold }}
          >
            Guest
          </Text>
        ) : (
          <Loading size={20} />
        )}
      </Animated.View>
    </GestureDetector>
  );
};
