import { View, Text, StyleSheet } from "react-native";
import ClippedText from "./ClippedText";
import { SignWithGoogle } from "./SignInWithGoogle";
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

export const SignInComponent = () => {
  const scale = useSharedValue(1);

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
            <Text style={[styles.text, { color: isDarkMode? "black":"white" }]}>Transactions</Text>
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
        <SignWithGoogle />
        <SignInGuest />
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
