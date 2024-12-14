import { View, Text, useWindowDimensions, Button } from "react-native";
import React, { useEffect } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useNavigation } from "@react-navigation/native";

import { MemoizedList } from "../components/Home/List";
import Animated from "react-native-reanimated";
import { useEmojiBottomSheet, useMode } from "../store/ui";
import { useWalletStore } from "../store/wallet";

import { useIsDarkMode } from "../hooks/getMode";

import { LoadingWalletContainer } from "../components/Home/Wallet/LoadingWalletContainer";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../util/axiosInstance";
import { formatUsd } from "../util/formatUsd";
import { OneSignal } from "react-native-onesignal";
import { NotificationContainer } from "../components/Notification/List/NotificationContainer";
import { useIsFingerPrintSuccess } from "../store/auth";

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
  const isFingerPrint = useIsFingerPrintSuccess(
    (state) => state.isFingerPrintSuccess
  );
  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["wallets"],
    queryFn: () =>
      apiClient.get("/wallets?recheck").then((res) => res.data.data),
  });

  console.log("👀", data);
  console.log("🚀 ~ file: Home.tsx:54 ~ Home ~ error:", error);
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
        <>
          {isFingerPrint ? (
            <Text
              style={{
                fontFamily: "Satoshi-Bold",
                color: textColor,
                fontSize: 14,
              }}
            >
              Prev: {walletState?.prevBalance?.toFixed(2) || "0.00"} SOL
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "Satoshi-Bold",
                color: textColor,
                fontSize: 14,
              }}
            >
              Prev: **** SOL
            </Text>
          )}
        </>
        {isFingerPrint ? (
          <Text
            style={{
              fontFamily: "Satoshi-Black",
              color: textColor,
              fontSize: 30,
            }}
          >
            {walletState?.currentBalance?.toFixed(2) || "0.00"} SOL
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: "Satoshi-Black",
              color: textColor,
              fontSize: 30,
            }}
          >
            {"****"} SOL
          </Text>
        )}
        <>
          {isFingerPrint ? (
            <Text
              style={{
                fontFamily: "Satoshi-Regular",
                color: textColor,
                fontSize: 18,
              }}
            >
              {formatUsd(walletState?.currentBalanceUSD || 0)}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "Satoshi-Regular",
                color: textColor,
                fontSize: 24,
              }}
            >
              ****
            </Text>
          )}
        </>
      </Animated.View>

      {/* <Button title="Display Notification" onPress={onDisplayNotification} /> */}
      {(isFetching || !isFingerPrint) ? (
        <LoadingWalletContainer quantity={8} />
      ) : (
        <MemoizedList refetch={refetch} isFetching={isFetching} />
      )}
    </View>
  );
}
