import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import { View, useColorScheme } from "react-native";
import { Theme } from "../../constants/Theme";

export const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  console.log(
    "🚀 ~ file: CustomBg.tsx:13 ~ animatedIndex:",
    animatedIndex.value
  );

  //#region styles
  const theme = useColorScheme();

  const animStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      ["#000000FF", "#18151BFF"]
    ),
  }));

  // render
  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[style, { borderRadius: 10, backgroundColor: "white" }, animStyle]}
      ></Animated.View>
    </>
  );
};

export default CustomBackground;
