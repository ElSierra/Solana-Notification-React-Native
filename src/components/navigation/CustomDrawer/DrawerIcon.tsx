import { View, Text } from "react-native";
import React from "react";
import { HamBurgerIcon } from "../../global/icons";
import { useIsDarkMode } from "../../../hooks/getMode";

export default function DrawerIcon() {
  const isDarkMode = useIsDarkMode();
  const color = isDarkMode ? "white" : "black";
  return <HamBurgerIcon size={30} color={color} />;
}
