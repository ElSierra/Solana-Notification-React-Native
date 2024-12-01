import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useIsDarkMode } from "../../../hooks/getMode";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LinearBackground = () => {
  const dark = useIsDarkMode();
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}
    >
      <LinearGradient
        colors={dark ? ["#002327FF", "#000000FF"] : ["#E6FCFEFF", "#FFFFFFFF"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: height + top,
          zIndex: 0,
        }}
      />
    </View>
  );
};

export default LinearBackground;
