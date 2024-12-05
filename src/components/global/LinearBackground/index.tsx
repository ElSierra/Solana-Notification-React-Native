import { View, Text, useWindowDimensions } from "react-native";
import React, { useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useIsDarkMode } from "../../../hooks/getMode";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDrawerProgress } from "@react-navigation/drawer";
import { useWalletStore } from "../../../store/wallet";

const LinearBackground = () => {
  const dark = useIsDarkMode();
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const walletAdjustSol = useWalletStore((state) => state.adjustSOL);
  console.log(
    "🚀 ~ file: index.tsx:14 ~ LinearBackground ~ walletAdjustSol:",
    walletAdjustSol
  );

  const getColorArray = useMemo(() => {
    if (walletAdjustSol === "up") {
      return dark ? ["#002327FF", "#000000FF"] : ["#E6FCFEFF", "#FFFFFFFF"];
    }
    return dark ? ["#270600FF", "#000000FF"] : ["#FEE6E6FF", "#FFFFFFFF"];
  }, [walletAdjustSol, dark]);
  return (
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
      <LinearGradient
        colors={getColorArray as any}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: height + top,
          zIndex: 0,
        }}
      />
    </View>
  );
};

export default LinearBackground;
