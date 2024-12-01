import { FC } from "react";
import { View, Text } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type LoadingProps = {
  size?: number;
};
export const Loading: FC<LoadingProps> = ({ size }) => {
  const rotateZ = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: `${rotateZ.value}deg` },
        {
          scaleX: 1.5,
        },
        {
          scaleY: 1.5,
        },
      ],
    };
  });

  useAnimatedReaction(
    () => {},
    () => {
      rotateZ.value = withRepeat(withTiming(rotateZ.value + 360), -1, false);
    }
  );
  return (
    <Animated.View entering={FadeIn.springify()} exiting={FadeOut.springify()}>
      <Animated.Image
        source={require("../../../../assets/logo.png")}
        style={[
          {
            height: size,
            width: size,
          },
          style,
        ]}
      />
    </Animated.View>
  );
};
