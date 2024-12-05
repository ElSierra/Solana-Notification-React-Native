import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  useWindowDimensions,
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
type WalletContainerProps = {
  walletName: string;
  walletAddress: string;
  walletBalance?: number;
  walletBalanceUSD?: number;
  emoji: number;
  id: string;
};

const WalletContainer: React.FC<WalletContainerProps> = ({
  walletAddress,
  walletBalance,
  walletBalanceUSD,
  emoji,
  id,
  walletName,
}) => {
  const vibrateAnimatedEnd = () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
    ReactNativeHapticFeedback.trigger("soft", options);
  };
  const isDarkMode = useIsDarkMode();

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

  const handleOpenWallet = () => {
    navigation.navigate("ViewWallet", { address: walletAddress });
  };
  const deleteWallet = useWalletStore((state) => state.removeWalletData);

  const containerDrag = useSharedValue(0);
  const containerHeight = useSharedValue(90);
  const getEmojiFromId = useMemo(
    () => (id: number) => {
      return emojis.find((emoji) => emoji.id === id)?.emoji;
    },
    []
  );
  const handleDeleteWallet = () => {
    console.log("delete wallet");
    containerDrag.value = withTiming(-width, { duration: 100 }, (finished) => {
      if (finished) {
        containerHeight.value = withTiming(0, { duration: 100 }, (finished) => {
          if (finished) {
            runOnJS(deleteWallet)(id);
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

  const textColor = isDarkMode ? "white" : "black";
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
        <Animated.View>
          <View
            style={{
              backgroundColor: isDarkMode ? "#262626FF" : "#D2D2D2FF",
              padding: 10,
              borderRadius: 20,
              width: "100%",
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
                    style={{
                      fontFamily: "Satoshi-Regular",
                      color: textColor,
                      fontSize: 10,
                    }}
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
                      color:textColor ,
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
                    {walletBalanceUSD
                      ? "$" + walletBalanceUSD.toFixed(2)
                      : "--"}
                  </Text>
                </View>
                <Text
                  style={{
                    color: textColor,
                    fontFamily: "satoshi-light",
                    fontSize: 12,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {walletAddress}
                </Text>
              </View>
            </Animated.View>
          </View>
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
