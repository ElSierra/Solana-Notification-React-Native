import { View, Text, StyleSheet } from "react-native";
import ClippedText from "./ClippedText";
import { SignWithGoogleAsync } from "./SignInWithGoogle";
import { SignInGuest } from "./SignInGuest";
import { Image } from "expo-image";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useIsDarkMode } from "../../hooks/getMode";
import { useAnimationFinished } from "../../store/ui";

export const SignInComponent = () => {
  const scale = useSharedValue(1);
  const translateYTop = useSharedValue(50);
  const opacityTop = useSharedValue(0);
  const translateYBottom = useSharedValue(-50);
  const opacityBottom = useSharedValue(0);
  const animationFinished = useAnimationFinished(
    (state) => state.animationFinished
  );

  const imgStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: scale.value }, { scaleY: scale.value }],
    };
  });

  const isDarkMode = useIsDarkMode();
  const textColor = isDarkMode ? "white" : "black";
  const bg = !isDarkMode ? "black" : "white";
  useAnimatedReaction(
    () => {},
    (value) => {
      scale.value = withRepeat(withTiming(1.1), -1, true);
    },
    []
  );

  useAnimatedReaction(
    () => {
      return animationFinished;
    },
    (value) => {

      if (value) {
        translateYTop.value = withSpring(0);
        translateYBottom.value = withSpring(0);
        opacityTop.value = withSpring(1);
        opacityBottom.value = withSpring(1);
      }
    },
    [animationFinished]
  );
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <View>
          <Text style={[styles.text, { color: textColor }]}>Track</Text>
          <Animated.Image
            source={require("../../../assets/icon.png")}
            style={[
              {
                backfaceVisibility: "hidden",
                height: 100,
                width: 100,
                position: "absolute",
                right: 0,
                top: -60,
              },
              imgStyle,
            ]}
          />
          <Text style={[styles.text, { color: textColor }]}>Your Crypto</Text>
          <View
            style={{
              backgroundColor: bg,
              alignItems: "center",
              height: 39,
              marginTop: 1,
            }}
          >
            <Text
              style={[styles.text, { color: isDarkMode ? "black" : "white" }]}
            >
              Transactions
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 40,
          gap: 20,
          position: "absolute",
          bottom: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SignWithGoogleAsync translateY={translateYTop} opacity={opacityTop} />
        <SignInGuest translateYBottom={translateYBottom} opacity={opacityBottom}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Satoshi-Black",
    fontSize: 50,
    color: "white",
    textAlign: "center",
    lineHeight: 50,

    includeFontPadding: false,
  },
});
