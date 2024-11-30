import React, { FC } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { ContainerProps } from "./RightContainer";
import Animated from "react-native-reanimated";

export const LeftContainer: FC<ContainerProps> = ({ height, width, style }) => {
  return (
    <Animated.View
      style={[
        {
          padding: 20,
          borderRadius: 20,
          backgroundColor: "#337357",
          position: "absolute",
          top: height / 5,
          left: 0,
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

          backgroundColor: "black",
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
          You just Received 10 SOL
        </Text>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            color: "white",
          }}
        >
          Your New Balance is 100 SOL
        </Text>
      </View>
    </Animated.View>
  );
};
