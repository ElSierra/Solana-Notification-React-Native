import { View, Text, Pressable } from "react-native";
import React from "react";
import { AddIcon } from "../../global/icons";
import { useNavigation } from "@react-navigation/native";
import { useModalState } from "../../../store";

export default function AddWallet() {
    const navigation = useNavigation();
    const  toggleState = useModalState((state)=>state.toggle);

   
  return (
    <Pressable
    onPress={() => {
        toggleState();
    }}
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <AddIcon size={60} color="white" />
    </Pressable>
  );
}
