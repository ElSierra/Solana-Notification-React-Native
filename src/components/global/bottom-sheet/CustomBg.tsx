import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  useAnimatedReaction,
  useDerivedValue,
  interpolate,
} from "react-native-reanimated";
import { View, useColorScheme } from "react-native";
import { Theme } from "../../../constants/Theme";
import { useIsDarkMode } from "../../../hooks/getMode";

export const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  //#region styles
  const isDarkMode = useIsDarkMode();
  useAnimatedReaction(
    () => animatedIndex.value,
    (value) => {
      console.log(value);
    },
    []
  );

  const bg = useDerivedValue(() => {
    if (isDarkMode) {
      return Theme.colors.background;
    }
    return "white";
  });
  const animStyle = useAnimatedStyle(() => ({
    backgroundColor: bg.value,
    opacity: interpolate(animatedIndex.value, [-0.9, 0], [0, 1]),
  }));

  // render
  return (
    <View style={[style]}>
      <Animated.View
        style={[style, { borderRadius: 10 }, animStyle]}
      ></Animated.View>
    </View>
  );
};

export default CustomBackground;
