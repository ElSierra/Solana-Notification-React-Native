import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { RightContainer } from "../components/SignIn/RightContainer";
import { LeftContainer } from "../components/SignIn/LeftContainer";
import { SignInComponent } from "../components/SignIn/SignInComponent";
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useAnimationFinished } from "../store/ui";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsDarkMode } from "../hooks/getMode";

export default function SignIn() {
  const { width, height } = useWindowDimensions();
  const [shouldRender, setShouldRender] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setShouldRender(true);
      // Do something when the screen is focused
      return () => {
        setShouldRender(false);
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  const animationFinished = useAnimationFinished(
    (state) => state.animationFinished
  );

  const animationPosition = useSharedValue(0);

  const rTranslateX = useSharedValue(width);
  const lTranslateX = useSharedValue(-width);
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: rTranslateX.value }],
    };
  });

  const lStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: lTranslateX.value }],
    };
  });

  useEffect(() => {
    if (animationFinished) {
      animationPosition.value = 1;
    }
  }),
    [animationFinished];
  useAnimatedReaction(
    () => {
      return animationPosition.value;
    },
    (value) => {
      if (value === 1) {
        rTranslateX.value = withSpring(width / 4, undefined, (isFinished) => {
          lTranslateX.value = withSpring(-width / 4);
        });
      }
    },
    [animationPosition.value]
  );

  const isDarkMode = useIsDarkMode();
  return (
    <View style={{ flex: 1 }}>
      <>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        >
          {/* <Canvas style={{ flex: 1 }}>
            <Group dither>
              <RadialGradient
                c={vec(width / 3, height)}
                r={900}
                colors={["#00000094", "#01272AFF"]}
              />
              <Rect x={0} y={0} width={width} height={height + 40} />
              <Fill color="#00000027" />
            </Group>
          </Canvas> */}
          <LinearGradient
            colors={
              isDarkMode
                ? ["#002327FF", "#000000FF"]
                : ["#E6FCFEFF", "#FFFFFFFF"]
            }
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: height + 40,
              zIndex: 0,
            }}
          />
        </View>
        <RightContainer style={rStyle} width={width} height={height} />
        <LeftContainer width={width} height={height} style={lStyle} />
        <SignInComponent />
      </>
    </View>
  );
}
