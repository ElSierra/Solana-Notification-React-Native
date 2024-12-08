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
import notifee from "@notifee/react-native";
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
import { formatUsd } from "../util/formatUsd";

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


  const { isPending, error, data, isFetching, refetch } = useQuery({


    queryKey: ["wallets"],
    queryFn: () => apiClient.get("/wallets?recheck").then((res) => res.data.data),
  });

  console.log("👀", data);
  console.log("🚀 ~ file: Home.tsx:54 ~ Home ~ error:", error)
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


  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body:
        'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        color: '#4caf50',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: { id: 'dance' },
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: { id: 'cry' },
          },
        ],
      },
    });
  }
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
        Prev: {walletState?.prevBalance?.toFixed(2) || "0.00"} SOL
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
          {formatUsd(walletState?.currentBalanceUSD||0)}
        </Text>
      </Animated.View>
      <Button title="Display Notification" onPress={onDisplayNotification} />
      {isFetching ? (
        <LoadingWalletContainer quantity={8} />
      ) : (
        <MemoizedList refetch={refetch} isFetching={isFetching} />
      )}
    </View>
  );
}
