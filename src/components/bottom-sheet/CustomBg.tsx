import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  useAnimatedReaction,
} from "react-native-reanimated";
import { View, useColorScheme } from "react-native";
import { Theme } from "../../constants/Theme";

export const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  //#region styles
  const theme = useColorScheme();

  const animStyle = useAnimatedStyle(() => ({
    backgroundColor: Theme.colors.background,
  }));

  // render
  return (
    <View style={[style, { backgroundColor: "black" }]}>
      <Animated.View
        style={[style, { borderRadius: 10 }, animStyle]}
      ></Animated.View>
    </View>
  );
};

export default CustomBackground;
