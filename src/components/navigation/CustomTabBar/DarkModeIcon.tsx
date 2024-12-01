import { View, Text, Platform } from "react-native";
import React from "react";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { IconProps, MoonIcon, SunIcon } from "../../global/icons";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { Theme } from "../../../constants/Theme";
import { useIsDarkMode } from "../../../hooks/getMode";

type AnimatedIconProps = {
  focused?: boolean;

  size?: number;
};
export const DarkModeIcon: React.FC<AnimatedIconProps> = ({ size }) => {
  const isDark = useIsDarkMode();

  return (
    <View>
      {isDark ? (
        <SunIcon size={size} color="white" />
      ) : (
        <MoonIcon size={size} color="black" />
      )}
    </View>
  );
};
