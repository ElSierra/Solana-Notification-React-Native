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
import { List, MemoizedList } from "../components/Notification/List";
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

import { useQuery } from "@tanstack/react-query";
import apiClient from "../util/axiosInstance";
import { formatUsd } from "../util/formatUsd";
import { OneSignal } from "react-native-onesignal";
import { LoadingWalletContainer } from "../components/Notification/List/LoadingWalletContainer";
import { WatchLanaIcon } from "../components/global/icons";
import { Theme } from "../constants/Theme";
import { Image } from "expo-image";

export default function Explore() {
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
    queryKey: ["notifications"],
    queryFn: () => apiClient.get("/notifications").then((res) => res.data.data),
  });
  console.log("🚀 ~ file: Explore.tsx:54 ~ Explore ~ data:", data);
  const isDarkMode = useIsDarkMode();
  const textColor = isDarkMode ? "white" : "black";

  const animatedPosition = useSharedValue(0);
  const scrollHeight = useSharedValue(0);

  console.log(
    "🚀 ~ file: Explore.tsx:76 ~ Explore ~ scrollHeight:",
    scrollHeight
  );

  const haederStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(animatedPosition.value, [0, 300], [0, -10]),
        },
      ],
    };
  });
  useEffect(() => {
    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      (event) => {
        refetch();
      }
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",

            height: height / 3,
          },
          haederStyle,
          // solAnimStyle,
        ]}
      >
        <Text
          style={{
            fontFamily: "Satoshi-Black",
            color: textColor,
            fontSize: 30,
          }}
        >
          Notifications
        </Text>
      </Animated.View>
      {(data && data.length ===0) && (
        <View
          style={{
            width: "100%",
            justifyContent: "center",

            alignItems: "center",
          }}
        >
         <Image source={require("../../assets/bird.png")} style={{width: 400, height: 400}}/>
        </View>
      )}
      {isFetching ? (
        <LoadingWalletContainer quantity={8} />
      ) : (
        <MemoizedList
          refetch={refetch}
          isFetching={isFetching}
          data={data}
          animatedPosition={animatedPosition}
          scrollHeight={scrollHeight}
        />
      )}
    </View>
  );
}
