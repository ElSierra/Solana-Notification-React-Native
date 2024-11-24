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

export default function Explore() {
  const { width, height } = useWindowDimensions();
  return <View style={{ flex: 1 }}></View>;
}
