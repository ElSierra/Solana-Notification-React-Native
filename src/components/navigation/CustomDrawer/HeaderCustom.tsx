import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import DrawerIcon from "./DrawerIcon";
import { DrawerHeaderProps } from "@react-navigation/drawer";

export const HeaderCustom = ({ navigation }:DrawerHeaderProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        marginTop: top,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{
          padding: 20,
        }}
      >
        <DrawerIcon />
      </TouchableOpacity>
    </View>
  );
};
