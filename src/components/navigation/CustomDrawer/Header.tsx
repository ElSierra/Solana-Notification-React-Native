import { View, Text } from "react-native";
import React from "react";
import { ProfileIcon } from "../../global/icons";
import { DrawerItem } from "@react-navigation/drawer";
import { Image, ImageBackground } from "expo-image";
import { useAuth } from "../../../store/auth";
import { useIsDarkMode } from "../../../hooks/getMode";

export default function Header() {
  const type = useAuth((state) => state.type);
  const authData = useAuth((state) => state.user);
  const dark = useIsDarkMode();
  const color = dark ? "white" : "black";
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
      
        <Image
          source={
            type === "guest"
              ? require("../../../../assets/logo.png")
              : authData?.picture
          }
          style={{ width: 150, aspectRatio:1,borderRadius:15  }}
        />
   
      <Text style={{ color }}>
        {type === "guest" ? "Guest" : authData?.name || "Loading..."}
      </Text>
    </View>
  );
}
