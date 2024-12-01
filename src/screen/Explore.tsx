import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { Image } from "react-native";
import {
  Canvas,
  Group,
  vec,
  Fill,
  RadialGradient,
  Rect,
} from "@shopify/react-native-skia";
import { LinearGradient } from "expo-linear-gradient";
import { useIsDarkMode } from "../hooks/getMode";

export default function Explore() {
  const { width, height } = useWindowDimensions();
  const isDarkMode = useIsDarkMode();
  return (
    <View style={{ flex: 1 }}>
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
        {/* <Canvas style={{ flex: 1 }}>
            <Group dither>
              <RadialGradient
                c={vec(width / 3, height)}
                r={900}
                colors={["#00000094", "#01272AFF"]}
              />
              <Rect x={0} y={0} width={width} height={height + 40} />
              <Fill color="#00000027" />
            </Group>
          </Canvas> */}
      </View>
    </View>
  );
}
