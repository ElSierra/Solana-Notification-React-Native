import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Canvas,
  Rect,
  Skia,
  Shader,
  vec,
  RadialGradient,
  interpolateColors,
  BackdropBlur,
  Fill,
  Group,
  Turbulence,
  Blend,
  Blur,
  DisplacementMap,
  SweepGradient,
  Paint,
} from "@shopify/react-native-skia";
import { LinearGradient } from "expo-linear-gradient";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { WalletContainer } from "../components/Home/Wallet/walletContainer";
import { Theme } from "../constants/Theme";
import { FlatList } from "react-native";
import AddWallet from "../components/Home/Wallet/AddWallet";
import { List } from "../components/Home/List";
import Animated, {
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function Home() {
  const bottomTabHeight = useBottomTabBarHeight();
  console.log(
    "🚀 ~ file: Home.tsx:7 ~ Home ~ bottomTabHeight:",
    bottomTabHeight
  );
  const { height, width } = useWindowDimensions();
  const offsetY = useSharedValue(0);
  const offsetHeight = useSharedValue(0);
  useAnimatedReaction(
    () => offsetY.value,
    (value) => {
      console.log("🚀 ~ file: Home.tsx:24 ~ Home ~ value", value);
    },
    [offsetY]
  );

  const solAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            offsetY.value,
            [0, offsetHeight.value],
            [0, -[offsetHeight.value / 18]],
            "clamp"
          ),
        },
      ],
    };
  });
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: 1,
        }}
      >
        <Canvas style={{ flex: 1 }}>
          <Group dither >
            <RadialGradient
              c={vec(width / 3, height)}
              r={900}
              colors={["#00000094", "#01272AFF"]}
            />

            <Rect x={0} y={0} width={width} height={height + 40} />
            <Fill color="#00000027" />
          </Group>
        </Canvas>
      </View>
      <Animated.View
        style={[
          {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",

            height: height / 3,
          },
          solAnimStyle,
        ]}
      >
        <Text
          style={{ fontFamily: "satoshi-bold", color: "white", fontSize: 14 }}
        >
          Total Sol
        </Text>
        <Text
          style={{ fontFamily: "satoshi-black", color: "white", fontSize: 30 }}
        >
          0.0000 SOL
        </Text>
      </Animated.View>
      <List offsetY={offsetY} offsetHeight={offsetHeight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    padding: 20,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  gradientBottom: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 999,
  },
  gradientTop: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 999,
  },
});
