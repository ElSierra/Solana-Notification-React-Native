import { View, Text } from "react-native";
import React, { FC } from "react";
import { useIsDarkMode } from "../../../hooks/getMode";
import { Image } from "expo-image";
import { Theme } from "../../../constants/Theme";

type TokenContainerProps = {
  isExpanded: boolean;
  usdt: number;
  usdc: number;
};
export const TokenContainer: FC<TokenContainerProps> = ({
  isExpanded,
  usdt,
  usdc,
}) => {
  const isDarkmode = useIsDarkMode();
  const color = isDarkmode ? "white" : "black";

  const getUsdtUsdc = () => {
    if (usdt) {
      return usdt.toFixed(2) + " USDT";
    }
    if (usdc) {
      return usdc.toFixed(2) + " USDC";
    }
    return "0.00";
  };
  return (
    <View style={{ paddingTop: 5 }}>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        {isExpanded && (
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Image
              source={require("../../../../assets/tether.svg")}
              style={{ width: 15, height: 15 }}
            />
            <Text style={{ color, fontFamily: Theme.fonts.SatoshiBold }}>
              /
            </Text>
            <Image
              source={require("../../../../assets/usdc.svg")}
              style={{ width: 15, height: 15 }}
            />
          </View>
        )}
        <View>
          <Text style={{ color, fontFamily: Theme.fonts.SatoshiBold }}>
     {getUsdtUsdc()}
          </Text>
        </View>
      </View>
    </View>
  );
};
