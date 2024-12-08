import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { WalletInput } from "./WalletInput.android";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useWalletStore } from "../../../../store/wallet";
import { toast } from "sonner-native";
import { isValidSolanaWallet } from "../../../../util/getIsValidSolanaWallet";
import { set } from "lodash";
import Animated, {
  FadeIn,
  runOnJS,
  useAnimatedKeyboard,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useAddWalletBottomSheet } from "../../../../store/ui";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useIsDarkMode } from "../../../../hooks/getMode";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../../../util/axiosInstance";
import { Theme } from "../../../../constants/Theme";
import { CautionIcon } from "../../icons";
import { queryClient } from "../../../../util/queryClient";

export default function Form({ emoji }: { emoji: number }) {
  const [form, setForm] = useState({
    walletName: "",
    walletAddress: "",
    emoji,
  });
  console.log("🚀 ~ file: index.tsx:22 ~ Form ~ form:", form);
  const { dismiss, dismissAll } = useBottomSheetModal();
  const addToWalletList = useWalletStore((state) => state.addWalletData);
  const { width: windowWidth } = useWindowDimensions();
  const addWalletList = useWalletStore((state) => state.addWalletList);

  const { isPending, error, data, mutate } = useMutation({
    mutationKey: ["wallets"],

    mutationFn: () =>
      apiClient
        .put("/add-wallet", {
          
          walletName: form.walletName,
          walletAddress: form.walletAddress,
          emojiId: form.emoji,
        })
        .then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
      dismissedState.value = true;
    },
    onError: (error: any) => {
      console.log("🚀 ~ file: index.tsx:47 ~ onError ~ error", error);
    },
  });

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
      // addToWalletList(form);
      mutate();

      // toast("Wallet Added");
    }

    // addToWalletList(form);
  };
  // useEffect(() => {
  //   dismissedState.value = data ? true : false;
  // }, [data]);

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
  const translateErrorX = useSharedValue(-windowWidth);

  const errorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateErrorX.value }],
    };
  });

  useAnimatedReaction(
    () => error,
    (error) => {
      if (error) {
        translateErrorX.value = withTiming(0, { duration: 300 }, (finished) => {
          if (finished) {
            translateErrorX.value = withDelay(2000, withTiming(-windowWidth));
          }
        });
      }
    }
  );
  return (
    <View style={{ padding: 10, gap: 10 }}>
      <Animated.View
        style={[
          {
            backgroundColor: "#FF6A00FF",
            paddingHorizontal: 6,
            paddingVertical: 3,
            alignSelf: "flex-start",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 5,
          },
          errorStyle,
        ]}
      >
        <CautionIcon size={16} color="white" />
        <Text
          style={[
            { color: "#FFFFFFFF", fontFamily: Theme.fonts.SatoshiRegular },
            errorStyle,
          ]}
        >
          {error?.response?.data?.message}
        </Text>
      </Animated.View>
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
            {isPending ? (
              <ActivityIndicator size={"small"} color={"black"} />
            ) : (
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
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
