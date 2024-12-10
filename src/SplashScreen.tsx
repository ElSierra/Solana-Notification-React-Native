import { View, Text, useWindowDimensions, Vibration } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Animated, {
  interpolateColor,
  LinearTransition,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Theme } from "./constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { TransparentCircleOverlay } from "./components/Home/Cicrle";
type SplashScreenViewProps = {
  finishAnimation: () => void;
};

export const SplashScreenView: React.FC<SplashScreenViewProps> = ({
  finishAnimation,
}) => {
  const quiRef = useRef<View>(null);
  const dioRef = useRef<View>(null);
  const { top } = useSafeAreaInsets();
  console.log("🚀 ~ file: SplashScreen.tsx:27 ~ top:", top);

  console.log(
    "🚀 ~ file: SplashScreen.tsx:18 ~ StatusBar:",
    StatusBar.currentHeight
  );
  const { width: windowWith, height: windowHeight } = useWindowDimensions();
  const [{ x: quiX, y: quiY, width: qWidth, height: qHeight }, setTargetRect] =
    useState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

  const [
    { x: dioX, y: dioY, width: dioWidth, height: dioHeight },
    setTargetRectDio,
  ] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  useLayoutEffect(() => {
    // The measurement and state update for `targetRect` happens in a single commit
    // allowing ToolTip to position itself without intermediate paints
    quiRef.current?.measureInWindow((x, y, width, height) => {
      setTargetRect({ x, y, width, height });
    });
    dioRef.current?.measureInWindow((x, y, width, height) => {
      setTargetRectDio({ x, y, width, height });
    });
  }, [setTargetRect]);

  //? Animation
  const opacityQui = useSharedValue(0);
  const showDio = useSharedValue(0);
  const colorInterpolation = useSharedValue(0);
  const canStartAnimation2 = useSharedValue(false);
  const canStartAnimation3 = useSharedValue(false);
  const scale = useSharedValue(0.1);

  const ADDHEIGHT = (StatusBar.currentHeight || 0) - 10;

  const vibratateAnimatedEnd = () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
    ReactNativeHapticFeedback.trigger("soft", options);
  };
  const animatedPosition = useSharedValue({
    x: 0,
    y: 0,
  });
  const animatedDioPosition = useSharedValue({
    x: 0,
    y: 0,
  });

  const animatedCirclePosition = useSharedValue({
    x: windowWith / 2 - 50,
    y: windowHeight / 2 - 50 + ADDHEIGHT,
  });

  const opacityCircle = useSharedValue(0);
  const bgColor = useSharedValue("black");

  useAnimatedReaction(
    () => animatedPosition.value,
    () => {
      if (animatedPosition.value.x !== 0) {
        opacityQui.value = 1;
      }
    }
  );

  useAnimatedReaction(
    () => {
      return {
        x: quiX,
        y: quiY,
        width: qWidth,
        height: qHeight,
      };
    },
    (start) => {
      console.log("qwidth", qWidth);
      animatedPosition.value = {
        x: (windowWith - qWidth) / 2,
        y: start.y + ADDHEIGHT,
      };
      animatedDioPosition.value = { x: windowHeight, y: start.y - 10 };

      showDio.value = withDelay(
        1000,
        withTiming(1, {
          duration: 1,
        })
      );
      colorInterpolation.value = withTiming(1, {
        duration: 1000,
      });
    }
  );

  useAnimatedReaction(
    () => showDio.value,
    (show) => {
      if (show) {
        animatedDioPosition.value = withSpring({
          x: dioX,
          y: dioY + ADDHEIGHT,
        });
        animatedPosition.value = withSpring(
          {
            x: quiX,
            y: quiY + ADDHEIGHT,
          },
          undefined,
          () => {
            canStartAnimation2.value = true;
          }
        );
      }
    }
  );

  useAnimatedReaction(
    () => {
      return canStartAnimation2.value;
    },
    (canStart) => {
      if (canStart) {
        animatedPosition.value = withTiming({
          x: -windowWith,
          y: quiY + ADDHEIGHT,
        });
        animatedDioPosition.value = withTiming(
          {
            x: windowWith,
            y: quiY + ADDHEIGHT,
          },
          undefined,
          () => {
            canStartAnimation3.value = true;
          }
        );
      }
    }
  );

  useAnimatedReaction(
    () => canStartAnimation3.value,
    (canStart) => {
      if (canStart) {
        opacityQui.value = withTiming(0, { duration: 100 });
        opacityCircle.value = withTiming(1, { duration: 400 }, () => {
          bgColor.value = "transparent";
          scale.value = withTiming(windowHeight / 70, undefined, (finish) => {
            runOnJS(vibratateAnimatedEnd)();
            if (finish) {
              runOnJS(finishAnimation)();
            }
          });
        });
      }
    }
  );
  console.log("x", quiX, "y", quiY, "width", qWidth, "height", qHeight);
  console.log("x", dioX, "y", dioY, "width", dioWidth, "height", dioHeight);

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
    };
  });
  const quiStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: animatedPosition.value.x },
        { translateY: animatedPosition.value.y },
      ],
      opacity: opacityQui.value,
    };
  });

  const dioStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: animatedDioPosition.value.x },
        { translateY: animatedDioPosition.value.y },
      ],
      opacity: opacityQui.value,
    };
  });

  const circleStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityCircle.value,
    };
  });

  const transform = useDerivedValue(() => {
    return [
      { translateX: windowWith / 2 }, // Move to the center horizontally
      { translateY: windowHeight / 2 + 20 }, // Move to the center vertically with an offset
      { scale: scale.value }, // Replace with your desired scale factor (e.g., 1.5)
      { translateX: -windowWith / 2 }, // Move back to original position
      { translateY: -(windowHeight / 2 + 20) }, // Move back to original position with offset
    ];
  });
  return (
    <>
      <Animated.View
        style={[
          {
            flex: 1,

            justifyContent: "center",
            alignItems: "center",
          },
          backgroundStyle,
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <View ref={quiRef}>
            <Text
              style={{
                fontFamily: "Satoshi-Black",
                fontSize: 30,
                color: "white",
                opacity: 0,
              }}
            >
              Watch
            </Text>
          </View>
          <View ref={dioRef}>
            <Text
              style={{
                fontFamily: "Satoshi-Black",
                fontSize: 30,
                color: "white",
                opacity: 0,
              }}
            >
              Lana
            </Text>
          </View>
        </View>
      </Animated.View>
      {
        <View style={{ position: "absolute", flex: 1 }}>
          <Animated.View
            style={[
              {
                flex: 1,
                position: "absolute",
                height: windowHeight + 40,
                width: windowHeight,
                zIndex: 999,
              },
              circleStyle,
            ]}
          >
            <TransparentCircleOverlay transform={transform} />
          </Animated.View>
          <Animated.View
            style={[
              {
                position: "absolute",
                width: windowWith,
              },
              quiStyle,
            ]}
          >
            <Text
              style={{
                fontFamily: "Satoshi-Black",
                fontSize: 30,
                color: Theme.colors.primary,
              }}
            >
              Watch
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              {
                position: "absolute",
                width: windowWith,
              },
              dioStyle,
            ]}
          >
            <Text
              style={{
                fontFamily: "Satoshi-Black",
                fontSize: 30,
                color: Theme.colors.primary,
              }}
            >
              lana
            </Text>
          </Animated.View>
        </View>
      }
    </>
  );
};
