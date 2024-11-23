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
type WalletContainerProps = {
  walletName: string;
  walletAddress: string;
  balance?: number;
  emoji: number;
  id: string;
};

const WalletContainer: React.FC<WalletContainerProps> = ({
  walletAddress,
  balance,
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
  const gesture = Gesture.Tap()
    .onBegin(() => {
      // scale.value = withTiming(0.9, { duration: 100 }, (finished) => {
      //   // if (finished) {
      //   //   scale.value = withDelay(0, withTiming(1, { duration: 100 }));
      //   // }
      // });
      // opacity.value = withTiming(0.5, { duration: 100 }, (finished) => {
      //   if (finished) {
      //     opacity.value = withDelay(0, withTiming(1, { duration: 100 }));
      //   }
      // });
    })
    .onStart(() => {
      runOnJS(handleDeleteWallet)();
    });

  const gestureAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

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

  const composed = Gesture.Simultaneous(gesture);

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    // eslint-disable-next-line react-compiler/react-compiler
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 80 }],
        opacity: prog.value,
      };
    });

    return (
      <Animated.View style={[styleAnimation, { flexDirection: "row" }]}>
        <View style={{ width: 5, height: 10 }} />

        <GestureDetector gesture={gesture}>
          <View style={styles.rightAction}>
            <View
              style={{
                backgroundColor: "#9C0404FF",
                height: 75,
                marginTop: 10,
                borderRadius: 20,

                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TrashIcon size={30} color="white" />
            </View>
          </View>
        </GestureDetector>
      </Animated.View>
    );
  }

  return (
    <ReanimatedSwipeable
      containerStyle={[styles.swipeable, containerAnimStyle]}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={80}
      renderRightActions={(prog, drag) => {
        containerDrag.value = drag.value;
        return RightAction(prog, drag);
      }}
    >
      <Animated.View style={{ height: 10 }} />
      <Animated.View
        onTouchEnd={() => {
           vibrateAnimatedEnd();
          handleOpenWallet();
        }}
        // onPressOut={() => {
        //   scale.value = withTiming(1, { duration: 100 });
        //   opacity.value = withTiming(1, { duration: 100 });
        // }}
      >
        <View
          style={{
            backgroundColor: "#262626FF",
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
              gestureAnimStyle,
            ]}
          >
            <View
              style={{
                width: 60,
                backgroundColor: "#00000074",
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
              <View
                style={{
                  padding: 2,
                  backgroundColor: "#024D49FF",
                  borderRadius: 10,
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontFamily: "satoshi-regular",
                    color: "white",
                    fontSize: 10,
                  }}
                >
                  {walletName}
                </Text>
              </View>
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
                  flexDirection: "row",
                  width: "99%",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "satoshi-black",
                    fontSize: 18,
                  }}
                >
                  {balance ? balance + " SOL" : "--"}
                </Text>
                <Text style={{ fontFamily: "satoshi-black", color: "white" }}>
                  $12000
                </Text>
              </View>
              <Text
                style={{
                  color: "white",
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
