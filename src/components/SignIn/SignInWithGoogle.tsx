import { Image } from "expo-image";
import { PixelRatio, Text, View } from "react-native";
import { Theme } from "../../constants/Theme";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useIsDarkMode } from "../../hooks/getMode";
import { useNavigation } from "@react-navigation/native";
export const SignWithGoogle = () => {
  const scale = useSharedValue(1);
  const isDarkMode = useIsDarkMode();
  const navigation = useNavigation();
  const textColor = !isDarkMode ? "white" : "black";
  const bg = !isDarkMode ? "black" : "white";
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: scale.value }, { scaleY: scale.value }],
    };
  });
  const tap = Gesture.Tap()
    .onBegin((e) => {
      "worklet";
      scale.value = withSpring(0.9);
    })
    .onStart((e) => {
      "worklet";
      scale.value = withSpring(1);
      // runOnJS(navigation.navigate)("Tabs" as any);
    })

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        style={[
          {
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: bg,
            padding: 20,
            borderRadius: 9999,
            width: "100%",
            gap: 10,
            alignItems: "center",
          },
          style,
        ]}
      >
        <Image
          source={require("../../../assets/images/google.svg")}
          style={{ height: 20, width: 20 }}
        />
        <Text style={{ color: textColor, fontFamily: Theme.fonts.SatoshiBold }}>
          Continue With Google
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};
