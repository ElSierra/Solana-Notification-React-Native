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

import { List, MemoizedList } from "../components/Home/List";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useEmojiBottomSheet, useMode } from "../store/ui";
import { useWalletStore } from "../store/wallet";
import switchTheme from "react-native-theme-switch-animation";
import { useIsDarkMode } from "../hooks/getMode";
import { useAuth, useTokenStore } from "../store/auth";
import { LinearGradient } from "expo-linear-gradient";
import LinearBackground from "../components/global/LinearBackground";
import { getValueFor } from "../util/secureStore";
import { LoadingWalletContainer } from "../components/Home/Wallet/LoadingWalletContainer";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../util/axiosInstance";

export default function Home() {
  const bottomTabHeight = useBottomTabBarHeight();
  const navigation = useNavigation();
  const emojiSheetState = useEmojiBottomSheet((state) => state.open);
  console.log(
    "🚀 ~ file: Home.tsx:7 ~ Home ~ bottomTabHeight:",
    bottomTabHeight
  );
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (emojiSheetState) {
      navigation.navigate("EmojiList");
    }
  }, [emojiSheetState]);

  const walletState = useWalletStore((state) => state);
  const addWalletList = useWalletStore((state) => state.addWalletList);
  const isTokenReady = useTokenStore((state) => state.isTokenReady);

  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => apiClient.get("/wallets").then((res) => res.data.data),
    enabled: isTokenReady,
  });

  console.log("👀", data);

  useEffect(() => {
    addWalletList({
      walletData: data?.wallets,
      adjustSOL: data?.adjustSOL,
      currentBalance: data?.currentBalance,
      currentBalanceUSD: data?.currentBalanceUSD,
      prevBalance: data?.prevBalance,
      prevBalanceUSD: data?.prevBalanceUSD,
    });
  }, [data]);
  const isDarkMode = useIsDarkMode();
  const textColor = isDarkMode ? "white" : "black";
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
        {/*  */}
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
          style={{
            fontFamily: "Satoshi-Black",
            color: textColor,
            fontSize: 30,
          }}
        >
          {walletState?.currentBalance?.toFixed(2) || "0.00"} SOL
        </Text>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            color: textColor,
            fontSize: 18,
          }}
        >
          {walletState?.currentBalanceUSD?.toFixed(2) || "0.00"} USD
        </Text>
      </Animated.View>
      {/* <LoadingWalletContainer quantity={8}/> */}

      <MemoizedList />
    </View>
  );
}
