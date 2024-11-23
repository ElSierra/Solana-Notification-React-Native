import { View, Text, TextInput } from "react-native";
import React from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

type WalletInputProps = {
  // add your custom props here
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
};
export const WalletInput:React.FC<WalletInputProps> = ({placeholder,onChangeText,value}) => {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        padding: 15,
        height: 50,
        backgroundColor: "#1D1D1DFF",
        borderColor: "white",
      }}
    >
      <BottomSheetTextInput
        maxLength={44}
        cursorColor={"white"}
        placeholder={placeholder}
        placeholderTextColor={"#7F7F7FFF"}
        selectionColor={"#0074A2FF"}
        onChangeText={onChangeText}
        autoComplete="off"
        autoCorrect={false}
        keyboardType="email-address"
        value={value}
        style={{
          fontSize: 18,
          width: "100%",
          includeFontPadding: false,
          fontFamily: "satoshi-regular",
          color: "white",
        }}
      />
    </View>
  );
};
