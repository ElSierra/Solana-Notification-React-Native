import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Canvas,
  Rect,
  LinearGradient,
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
} from "@shopify/react-native-skia";
import { Default } from "../components/Home/Emojis/Default";
import { Pulse } from "../components/Home/Pulse";
import Animated, {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { WalletContainer } from "../components/Home/Wallet/walletContainer";
import { Theme } from "../constants/Theme";
import { FlatList } from "react-native";
import AddWallet from "../components/Home/Wallet/AddWallet";

export default function Home() {
  const bottomTabHeight = useBottomTabBarHeight();
  console.log(
    "🚀 ~ file: Home.tsx:7 ~ Home ~ bottomTabHeight:",
    bottomTabHeight
  );
  const { height, width } = useWindowDimensions();

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
          <Group>
            <Rect x={0} y={0} width={width} height={height + 40}>
              <SweepGradient
                c={vec(width / 3, height / 2)}
             
                colors={["#232323FF", "#11013800","purple","green"]}
              />
            </Rect>
      
        
          </Group>
        </Canvas>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
          height: height / 4,
        }}
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
      </View>

      <FlatList
        fadingEdgeLength={100}
        contentContainerStyle={{ padding: 10, gap: 10, paddingBottom: 80 }}
        data={[1, 2, 3, 45, 6, 7, 8, 9, 0]}
        ListFooterComponent={() => <AddWallet />}
        renderItem={({ item }) => <WalletContainer />}
      />
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
});
