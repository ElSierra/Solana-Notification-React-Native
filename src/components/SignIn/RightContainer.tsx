import {
  View,
  Text,
  RegisteredStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { Image } from "expo-image";
export type ContainerProps = {
  width: number;
  style: AnimatedStyle<StyleProp<ViewStyle>>;
  height: number;
};
export const RightContainer: FC<ContainerProps> = ({
  width,
  height,
  style,
}) => {
  return (
    <Animated.View
      style={[
        {
          padding: 20,
          borderRadius: 20,
          backgroundColor: "#EE4266",
          position: "absolute",
          top: height / 12,
          right: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        },
        style,
      ]}
    >
      <View
        style={{
          padding: 6,

          backgroundColor: "white",
          borderRadius: 9999,
        }}
      >
        <Image
          source={require("../../../assets/images/solana.svg")}
          style={{
            width: 10,
            height: 10,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            color: "white",
          }}
        >
          10 SOL Sent out from Wallet sol.....
        </Text>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            color: "white",
          }}
        >
          Check if it was you
        </Text>
      </View>
    </Animated.View>
  );
};
