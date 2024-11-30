import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Canvas,
  Text,
  Rect,
  Mask,
  Paint,
  useFont,
} from "@shopify/react-native-skia";

const ClippedText = () => {
  const font = useFont(require("../../../assets/fonts/Satoshi-Black.otf"));
  return (
    <View style={styles.container}>
      <Canvas style={{ width: 300, height: 100 }}>
        {/* Create a mask */}
        <Mask
          mode="luminance" // Use the luminance of the mask
          mask={<Rect x={0} y={20} width={300} height={40} color="black" />}
        >
          {/* Render the text */}
          <Text x={10} y={70} text="together" font={font} color="black" />
        </Mask>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default ClippedText;
