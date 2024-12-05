import { FC } from "react";
import { View } from "react-native";
import { useIsDarkMode } from "../../../hooks/getMode";
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type props = {
  quantity: number;
};

export const LoadingWalletContainer: FC<props> = ({ quantity }) => {
  const isDarkMode = useIsDarkMode();
  const backgroundColor = isDarkMode ? "#262626FF" : "#D6EDEFFF";
  const bgColorInner = isDarkMode ? "#00000074" : "#BFBFBF1A";
  const textColor = isDarkMode ? "#B3B3B35B" : "#E9F7EDFF";

  const opacity = useSharedValue(0.4);
  const viewStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useAnimatedReaction(
    () => {},
    (value) => {
      opacity.value = withRepeat(
        withTiming(1, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    }
  );

  return (
    <Animated.View style={[{ paddingHorizontal: 10 }, viewStyle]}>
      {Array.from({ length: quantity }).map((_, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: "row",
            marginBottom: 9,
            padding: 10,
            backgroundColor,
            borderRadius: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: bgColorInner,
                }}
              />
              <View
                style={{
                  marginLeft: 8,
                  justifyContent: "space-evenly",

                  width: "80%",
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      height: 10,
                      width: 100,
                      borderRadius: 5,
                      backgroundColor: textColor,
                    }}
                  />

                  <View
                    style={{
                      height: 10,
                      width: 50,
                      borderRadius: 5,
                      backgroundColor: textColor,
                      marginTop: 4,
                    }}
                  />
                </View>
                <View
                  style={{
                    height: 10,
                    width: 50,
                    borderRadius: 5,
                    backgroundColor: textColor,
                    marginTop: 4,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      ))}
    </Animated.View>
  );
};
