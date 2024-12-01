import { View, Text } from "react-native";
import React from "react";
import { ProfileIcon } from "../../global/icons";
import { DrawerItem } from "@react-navigation/drawer";
import { Image, ImageBackground } from "expo-image";

export default function Header() {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        marginTop: 40,
        alignItems: "center",
        paddingLeft: 20,

        padding: 20,
      }}
    >
      <ImageBackground
       source={require("../../../../assets/logo.png")}
       blurRadius={200}
        style={{ padding: 20, overflow:"hidden", borderRadius: 9999 }}
      >
        <Image
          source={require("../../../../assets/logo.png")}
          style={{ width: 80, height: 80 }}
        />
      </ImageBackground>
    </View>
  );
}
