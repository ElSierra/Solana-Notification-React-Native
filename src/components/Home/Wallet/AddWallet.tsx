import { View, Text, Pressable } from "react-native";
import React from "react";
import { AddIcon } from "../../global/icons";
import { useNavigation } from "@react-navigation/native";
import { useModalState } from "../../../store";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
export default function AddWallet() {
  const navigation = useNavigation();
  const toggleState = useModalState((state) => state.toggle);
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

      runOnJS(toggleState)();
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

  return (
    <Animated.View
      style={[
        {
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        addWalletAnimStyle,
      ]}
    >
      <GestureDetector gesture={gesture}>
        <AddIcon size={60} color="white" />
      </GestureDetector>
    </Animated.View>
  );
}
