import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Button,
} from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useViewWalletBottomSheet } from "../../../store/ui";
import React, { useMemo, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  useAnimatedReaction,
  SharedValue,
  withDelay,
} from "react-native-reanimated";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { TrashIcon } from "../../global/icons";
import { emojis } from "../../../data/emoji";
import { useWalletStore } from "../../../store/wallet";
import { useIsDarkMode } from "../../../hooks/getMode";
import RightAction from "./RightAction";
import { formatUsd } from "../../../util/formatUsd";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../util/axiosInstance";
import { queryClient } from "../../../util/queryClient";
import { TokenContainer } from "./TokenContainer";
type WalletContainerProps = {
  walletName: string;
  walletAddress: string;
  walletBalance?: number;
  walletBalanceUSD?: number;
  emoji: number;
  id: string;
  usdtBalance?: number;
  usdcBalance?: number;
};

const WalletContainer: React.FC<WalletContainerProps> = ({
  walletAddress,
  walletBalance,
  walletBalanceUSD,
  emoji,
  id,
  walletName,
  usdtBalance,
  usdcBalance,
}) => {
  const vibrateAnimatedEnd = () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
    ReactNativeHapticFeedback.trigger("soft", options);
  };
  const isDarkMode = useIsDarkMode();
  const [oneLine, setOneline] = useState(true);
  const { width } = useWindowDimensions();
  const navigation = useNavigation<HomeNavigationProp>();
  // const openWalletState = useViewWalletBottomSheet((state) => state.setSate);
  // const [result, setResult] = useState<any>(null);

  // const _handlePressButtonAsync = async () => {
  //   let result = await WebBrowser.openBrowserAsync(
  //     `https://solscan.io/address/${address}`,
  //     {
  //       enableBarCollapsing: true,
  //       showInRecents: true,
  //       showTitle: false,
  //       createTask: true,
  //       toolbarColor: "#011F21FF",
  //     }
  //   );
  //   setResult(result);
  // };

  const { isPending, error, data, mutate } = useMutation({
    mutationKey: ["wallets"],

    mutationFn: () =>
      apiClient
        .delete("/delete-wallet", {
          data: {
            id: id,
          },
        })
        .then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
    },
    onError: (error: any) => {
      console.log("🚀 ~ file: index.tsx:47 ~ onError ~ error", error);
    },
  });
  console.log("hhh", data);

  const deleteWallet = useWalletStore((state) => state.removeWalletData);

  const [isOpened, setIsOpened] = useState(false);
  const containerDrag = useSharedValue(0);
  const containerHeight = useSharedValue(90);
  const textHeight = useSharedValue(15);
  const innerContainerHeight = useSharedValue(90);
  const getEmojiFromId = useMemo(
    () => (id: number) => {
      return emojis.find((emoji) => emoji.id === id)?.emoji;
    },
    []
  );

  const handleOpenWallet = () => {
    setIsOpened(!isOpened);

    // navigation.navigate("ViewWallet", { address: walletAddress });
  };
  const handleDeleteWallet = () => {
    console.log("delete wallet");
    containerDrag.value = withTiming(-width, { duration: 100 }, (finished) => {
      if (finished) {
        containerHeight.value = withTiming(0, { duration: 100 }, (finished) => {
          if (finished) {
            //runOnJS(deleteWallet)(id);
            console.log("delete walletsssss");
            runOnJS(mutate)();
          }
        });
      }
    });
  };
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useAnimatedReaction(
    () => containerDrag.value,
    () => {
      console.log("containerDrag:", containerDrag.value);
    }
  );
  const containerAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: containerDrag.value }],
      height: containerHeight.value,
    };
  });

  const gesture = Gesture.Tap()
    .onBegin(() => {
      "worklet";
    })
    .onEnd(() => {
      "worklet";
      scale.value = withTiming(1);
      runOnJS(handleOpenWallet)();
    });

  useAnimatedReaction(
    () => isOpened,
    (value) => {
      if (value) {
        containerHeight.value = withTiming(135, { duration: 150 }, () => {
          textHeight.value = withTiming(30, { duration: 150 });
          runOnJS(setOneline)(false);
        });
        return;
      }
      containerHeight.value = withTiming(90, { duration: 150 }, () => {
        runOnJS(setOneline)(true);
        textHeight.value = withTiming(15, { duration: 150 });
      });
    }
  );
  const textColor = isDarkMode ? "white" : "black";

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      height: textHeight.value,
    };
  });
  return (
    <ReanimatedSwipeable
      containerStyle={[styles.swipeable, containerAnimStyle]}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={80}
      renderRightActions={(prog, drag) => {
        containerDrag.value = drag.value;
        return RightAction(prog, drag, handleDeleteWallet);
      }}
    >
      <Animated.View style={{ height: 10 }} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={{
            backgroundColor: isDarkMode ? "#262626FF" : "#D2D2D2FF",
            padding: 10,
            borderRadius: 20,
            width: "100%",
            height: "88%",
          }}
        >
          <Animated.View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <View
              style={{
                width: 60,
                backgroundColor: isDarkMode ? "#00000074" : "#FFFFFFB8",
                borderRadius: 999,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                padding: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  includeFontPadding: false,
                  fontFamily: "windows",
                }}
              >
                {getEmojiFromId(emoji)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                justifyContent: "space-evenly",
                height: 60,
              }}
            >
              <View
                style={{
                  padding: 2,
                  backgroundColor: isDarkMode ? "#024D49FF" : "#04B675FF",
                  borderRadius: 10,
                  alignSelf: "flex-start",
                }}
              >
                <Text
                  ellipsizeMode="tail"
                  style={[
                    {
                      fontFamily: "Satoshi-Regular",
                      color: textColor,
                      fontSize: 10,
                    },
                  ]}
                >
                  Wallet: {walletName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "99%",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: textColor,
                    fontFamily: "Satoshi-Black",
                    fontSize: 18,
                  }}
                >
                  {walletBalance ? walletBalance.toFixed(2) + " SOL" : "--"}
                </Text>
                <Text
                  style={{
                    fontFamily: "Satoshi-Black",
                    color: textColor,
                  }}
                >
                  {walletBalanceUSD ? formatUsd(walletBalanceUSD) : "--"}
                </Text>
              </View>
              <Animated.Text
                style={[
                  {
                    color: textColor,
                    fontFamily: "satoshi-light",
                    fontSize: 12,
                  },
                  animatedTextStyle,
                ]}
                numberOfLines={!oneLine ? 2 : 1}
                ellipsizeMode="tail"
              >
                {walletAddress}
              </Animated.Text>
              {!oneLine && <TokenContainer isExpanded={!oneLine} usdt={usdtBalance||0} usdc={usdcBalance||0} />}
            </View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </ReanimatedSwipeable>
  );
};

export default React.memo(WalletContainer);

const styles = StyleSheet.create({
  rightAction: {
    width: 75,
    height: 90,

    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
  swipeable: {
    height: 90,

    width: "100%",
  },
});
