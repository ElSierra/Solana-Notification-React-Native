import { View, Text, TouchableOpacity } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useViewWalletBottomSheet } from "../../../store/ui";
import React, { useState } from "react";
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
import * as WebBrowser from 'expo-web-browser';

type WalletContainerProps = {
  name: string;
  address: string;
  balance: string;
  emoji: string;
};

export const WalletContainer: React.FC<WalletContainerProps> = ({
  name,
  address,
  balance,
  emoji,
}) => {
  const vibrateAnimatedEnd = () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
    ReactNativeHapticFeedback.trigger("soft", options);
  };

  const openWalletState = useViewWalletBottomSheet((state) => state.setSate);
  const [result, setResult] = useState<any>(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(`https://solscan.io/address/${address}`);
    setResult(result);
  };

  const handleOpenWallet = () => {
    openWalletState({ name, address, balance, emoji, open: true });
  };

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withTiming(0.9, { duration: 100 }, (finished) => {
        if (finished) {
          scale.value = withDelay(0, withTiming(1, { duration: 100 }));
        }
      });
      opacity.value = withTiming(0.5, { duration: 100 }, (finished) => {
        if (finished) {
          opacity.value = withDelay(0, withTiming(1, { duration: 100 }));
        }
      });
    })
    .onStart(() => {
      runOnJS(vibrateAnimatedEnd)();
      runOnJS(_handlePressButtonAsync)();
      console.log("tapped");
    });

  const gestureAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  // const longPress = Gesture.LongPress()
  //   .onBegin(() => {
  //     scale.value = withTiming(0.9, { duration: 100 });
  //     opacity.value = withTiming(0.5, { duration: 100 });
  //   })
  //   .onStart(() => {

  //     runOnJS(vibrateAnimatedEnd)();
  //     scale.value = withTiming(1, { duration: 100 });
  //     opacity.value = withTiming(1, { duration: 100 });
  //   });

  const composed = Gesture.Simultaneous(gesture);
  return (
    <GestureDetector gesture={composed}>
      <View
        style={{
          backgroundColor: "#000000CE",
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
              backgroundColor: "#000000",
              borderRadius: 999,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, includeFontPadding: false }}>
              {emoji}
            </Text>
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ color: "white", fontFamily: "satoshi-black" }}>
              {balance} SOL
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: "satoshi-light",
                fontSize: 16,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {address}
            </Text>
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};
