import { View, Text, useWindowDimensions, Button } from "react-native";
import React, { useEffect } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useNavigation } from "@react-navigation/native";
import {
  Canvas,
  Rect,
  vec,
  RadialGradient,
  Fill,
  Group,
} from "@shopify/react-native-skia";

import { List } from "../components/Home/List";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useEmojiBottomSheet, useMode } from "../store/ui";
import { useWalletStore } from "../store/wallet";
import switchTheme from "react-native-theme-switch-animation";
import { useIsDarkMode } from "../hooks/getMode";

export default function Home() {
  const bottomTabHeight = useBottomTabBarHeight();
  const navigation = useNavigation();
  const emojiSheetState = useEmojiBottomSheet((state) => state.open);
  console.log(
    "🚀 ~ file: Home.tsx:7 ~ Home ~ bottomTabHeight:",
    bottomTabHeight
  );
  const { height } = useWindowDimensions();
  const offsetY = useSharedValue(0);
  const offsetHeight = useSharedValue(0);
  const addDummyData = useWalletStore((state) => state.addDummyData);
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

  useEffect(() => {
    if (emojiSheetState) {
      navigation.navigate("EmojiList");
    }
  }, [emojiSheetState]);

  useEffect(() => {}, []);
  const mode = useMode();

  const isDarkMode = useIsDarkMode();
  const textColor = isDarkMode ? "white" : "black";
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
      <Animated.View
        style={[
          {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",

            height: height / 3,
          },
          // solAnimStyle,
        ]}
      >
        <Text
          style={{ fontFamily: "Satoshi-Bold", color: textColor, fontSize: 14 }}
        >
          Total Sol
        </Text>
        <Text
          style={{ fontFamily: "Satoshi-Black", color: textColor, fontSize: 30 }}
        >
          0.0000 SOL
        </Text>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            color: textColor,
            fontSize: 18,
          }}
        >
          $100.00 USD
        </Text>
      </Animated.View>
    
      <List offsetY={offsetY} offsetHeight={offsetHeight} />
    </View>
  );
}
