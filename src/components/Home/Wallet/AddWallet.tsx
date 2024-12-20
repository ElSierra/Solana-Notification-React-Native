import { View, Text, Pressable, Platform } from "react-native";
import React from "react";
import { AddIcon } from "../../global/icons";
import { useNavigation } from "@react-navigation/native";
import { useAddWalletBottomSheet } from "../../../store/ui";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useIsDarkMode } from "../../../hooks/getMode";
import { HomeNavigationProp } from "../../../../types/navigation";
export default function AddWallet() {
  const navigation = useNavigation<HomeNavigationProp>();
  const toggleState = useAddWalletBottomSheet((state) => state.toggle);
  const vibrateAnimatedEnd = () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
    ReactNativeHapticFeedback.trigger("soft", options);
  };

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withTiming(0.9, { duration: 100 });
      opacity.value = withTiming(0.5, { duration: 100 });

      runOnJS(vibrateAnimatedEnd)();
      Platform.OS === "ios" && runOnJS(navigation.navigate)("CreateWallet" as any);

      Platform.OS === "android" && runOnJS(toggleState)();
    })
    .onStart(() => {
      scale.value = withTiming(1, { duration: 100 });
      opacity.value = withTiming(1, { duration: 100 });
    });

  const addWalletAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  const isDarkMode = useIsDarkMode();
  return (
    <Animated.View
      style={[
        {
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        },
        addWalletAnimStyle,
      ]}
    >
      <GestureDetector gesture={gesture}>
        <AddIcon size={60} color={isDarkMode ? "white" : "black"} />
      </GestureDetector>
    </Animated.View>
  );
}
