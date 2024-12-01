import { View, Text } from "react-native";
import React from "react";
import { useIsDarkMode } from "../../../hooks/getMode";
import { HamBurgerIcon, LogoutIcon } from "../../global/icons";

export default function LogoutIconComponent() {
  const isDarkMode = useIsDarkMode();
  const color = isDarkMode ? "white" : "black";
  return <LogoutIcon size={20} color={color} />;
}
