import React from "react";
import {
  AnimatedProp,
  Canvas,
  Circle,
  Fill,
  Group,
  Transforms3d,
} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

type TransparentCircleOverlayProps = {
  transform?: AnimatedProp<Transforms3d | undefined>;
};
export const TransparentCircleOverlay: React.FC<
  TransparentCircleOverlayProps
> = ({ transform }) => {
  const { width: windowWith, height: windowHeight } = useWindowDimensions();

  return (
    <Canvas style={{ flex: 1,height:windowHeight }}>
      {/* Fill the entire canvas with black */}
      <Fill color="black" />
      <Group
        transform={transform}
      >
        {/* Create a transparent circle in the middle */}
        <Circle
          cx={windowWith / 2} // Center horizontally
          cy={windowHeight / 2 + 20} // Center vertically with an offset
          r={100} // Your desired radius
          color="transparent"
          blendMode="clear"
        />
      </Group>
    </Canvas>
  );
};
