import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { WalletInput } from "./WalletInput.android";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useWalletStore } from "../../../../store/wallet";
import { toast } from "sonner-native";
import { isValidSolanaWallet } from "../../../../util/getIsValidSolanaWallet";
import { set } from "lodash";
import Animated, {
  runOnJS,
  useAnimatedKeyboard,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useAddWalletBottomSheet } from "../../../../store/ui";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useIsDarkMode } from "../../../../hooks/getMode";

export default function Form({ emoji }: { emoji: number }) {
  const [form, setForm] = useState({
    walletName: "",
    walletAddress: "",
    emoji,
  });
  console.log("🚀 ~ file: index.tsx:22 ~ Form ~ form:", form);
  const { dismiss, dismissAll } = useBottomSheetModal();
  const toggleSheetState = useAddWalletBottomSheet((state) => state.toggle);
  const addToWalletList = useWalletStore((state) => state.addWalletData);
  const walletData = useWalletStore((state) => state.walletData);
  console.log("🚀 ~ file: index.tsx:16 ~ Form ~ walletData:", walletData);

  const [isValidWallet, setIsValidWallet] = useState({
    walletName: false,
    walletAddress: false,
  });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const animatedKeyboard = useAnimatedKeyboard({
    isNavigationBarTranslucentAndroid: true,
    isStatusBarTranslucentAndroid: true,
  });
  const dismissedState = useSharedValue(false);
  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     () => {
  //       setKeyboardVisible(true); // or some other action
  //     }
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     "keyboardDidHide",
  //     () => {
  //       setKeyboardVisible(false); // or some other action
  //     }
  //   );

  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  useAnimatedReaction(
    () => {
      return {
        keyboardHeight: animatedKeyboard.height.value,
        dismissedState: dismissedState.value,
      };
    },
    ({ keyboardHeight, dismissedState }) => {
      if (keyboardHeight === 0 && dismissedState) {
        console.log("🚀 ~ file: index.tsx:64 ~ dismissedState", dismissedState);
        runOnJS(dismiss)();
      }
    }
  );

  const translateXAddress = useSharedValue(0);
  const translateXName = useSharedValue(0);
  const handleWalletName = (text: string) => {
    setForm({ ...form, walletName: text });
  };

  useEffect(() => {
    if (form.walletName.length === 0) {
      setIsValidWallet((prev) => {
        return { ...prev, walletName: false };
      });
    }
    if (form.walletName.length > 0) {
      setIsValidWallet((prev) => {
        return { ...prev, walletName: true };
      });
    }

    if (isValidSolanaWallet(form.walletAddress)) {
      setIsValidWallet((prev) => {
        return { ...prev, walletAddress: true };
      });
    }

    if (!isValidSolanaWallet(form.walletAddress)) {
      setIsValidWallet((prev) => {
        return { ...prev, walletAddress: false };
      });
    }
  }, [form.walletName, form.walletAddress]);
  const handleWalletAddress = (text: string) => {
    setForm({ ...form, walletAddress: text });
  };

  const handleSaveWallet = () => {
    if (!isValidWallet.walletAddress) {
      translateXAddress.value = withSequence(
        withTiming(-10, { duration: 100 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
    }
    if (!isValidWallet.walletName) {
      translateXName.value = withSequence(
        withTiming(-10, { duration: 100 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
    }
    if (isValidWallet.walletName && isValidWallet.walletAddress) {
      Keyboard.dismiss();
      addToWalletList(form);
      dismissedState.value = true;

      // toast("Wallet Added");
    }

    // addToWalletList(form);
  };

  const walletAddressStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXAddress.value }],
    };
  });

  const walletNameStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXName.value }],
    };
  });

  const isDarkMode = useIsDarkMode();
  return (
    <View style={{ padding: 10, gap: 10 }}>
      <Animated.View style={walletNameStyle}>
        <WalletInput
          placeholder="Wallet Name"
          onChangeText={handleWalletName}
          value={form.walletName}
        />
      </Animated.View>
      <Animated.View style={walletAddressStyle}>
        <WalletInput
          placeholder="Wallet Address"
          onChangeText={handleWalletAddress}
          value={form.walletAddress}
        />
      </Animated.View>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={handleSaveWallet}>
        <View
          style={{
            backgroundColor: isDarkMode ? "white" : "black",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Satoshi-Medium",
                textAlign: "center",
                fontSize: 16,
                color: isDarkMode ? "black" : "white",
              }}
            >
              Save Wallet
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
