import { View, Text } from "react-native";

export const WalletContainer = () => {
  return (
    <View
      style={{
        backgroundColor: "#00000083",
        padding: 10,
        borderRadius: 10,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: 60,
          backgroundColor: "#000000",
          borderRadius: 999,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, includeFontPadding: false }}>😎</Text>
      </View>
      <View
        style={{ flex: 1, marginLeft: 10 }}
      >
        <Text style={{ color: "white", fontFamily: "satoshi-black" }}>
          0.0123 SOL
        </Text>
        <Text
          style={{
            color: "white",
            fontFamily: "satoshi-light",
            fontSize: 16,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          0x4jsjlasljalsjpalpasasssdddddddddd
        </Text>
      </View>
    </View>
  );
};