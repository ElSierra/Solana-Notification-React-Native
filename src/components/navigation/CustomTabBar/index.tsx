import { View, Text, useWindowDimensions, Platform } from "react-native";
import React, { useLayoutEffect, useMemo, useRef } from "react";
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  createStaticNavigation,
  useLinkBuilder,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { Theme } from "../../../constants/Theme";
import { PlatformPressable } from "@react-navigation/elements";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHideTabBar, useMode } from "../../../store/ui";
import { LinearGradient } from "expo-linear-gradient";
import { useIsDarkMode } from "../../../hooks/getMode";
import switchTheme from "react-native-theme-switch-animation";
import { useWalletStore } from "../../../store/wallet";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const refs = useRef<(View | null)[]>([]);

  const { bottom } = useSafeAreaInsets();

  const [position, setPosition] = React.useState<
    {
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    }[]
  >([]);

  const vibrateAnimatedEnd = () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
    ReactNativeHapticFeedback.trigger("soft", options);
  };

  useLayoutEffect(() => {
    refs.current.forEach((ref) => {
      if (ref) {
        ref.measure((x, y, width, height, pageX, pageY) => {
          setPosition((prev) => [
            ...prev,
            { x, y, width, height, pageX, pageY },
          ]);
        });
      }
    });
  }, []);

  const x = useSharedValue(0);

  const width = useSharedValue(0);
  const focusedIndex = state.index;
  const indicatorStyle = useAnimatedStyle(() => {
    0;
    return {
      transform: [{ translateX: x.value }],
      width: width.value,
    };
  });

  useAnimatedReaction(
    () => position,
    () => {
      if (position.length) {
        const indicatorWidth = position[focusedIndex].width / 3;
        const indicatorX =
          position[focusedIndex].x +
          position[focusedIndex].width / 2 -
          indicatorWidth / 2 -
          (Platform.OS === "ios" ? 5 : 0);

        x.value = withSpring(indicatorX);
        width.value = withTiming(indicatorWidth);
      }
    }
  );

  const isDarkMode = useIsDarkMode();
  const toggleMode = useMode((state) => state.toggleMode);

  const walletAdjustSol = useWalletStore((state) => state.adjustSOL);
  console.log(
    "🚀 ~ file: index.tsx:14 ~ LinearBackground ~ walletAdjustSol:",
    walletAdjustSol
  );

  const getColorArray = useMemo(() => {
    if (walletAdjustSol === "up") {
      return isDarkMode
        ? ["#00000000", "#002327FF"]
        : ["#FFFFFF00", "#E6FCFEFF"];
    }
    return isDarkMode ? ["#00000000", "#270600FF"] : ["#FFFFFF00", "#FEE6E6FF"];
  }, [walletAdjustSol, isDarkMode]);

  return (
    <View
      style={[
        {
          flexDirection: "row",
          height: Platform.OS === "ios" ? 24 * 4 : 24 * 2.4+ bottom,
          backgroundColor: "#00000000",
          // borderTopRightRadius: 20,
          // borderTopLeftRadius: 20,
          paddingBottom: bottom,
          overflow: "hidden",

          // borderTopColor: "#2E2E2EFF",
          // borderLeftColor: "#2E2E2EFF",
          // borderRightColor: "#2E2E2EFF",

          position: "absolute",
          bottom: 0,
          width: "100%",
        },
      ]}
    >
      <LinearGradient
        colors={getColorArray as any}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: Platform.OS === "ios" ? 24 * 4 : (24 * 2.4+ bottom),
          zIndex: 0,
        }}
      />
      {/* <BlurView
        style={{ width: "100%", height: 600 ,position: "absolute" }}
        experimentalBlurMethod="dimezisBlurView"
        intensity={100}
        tint="dark"
      /> */}
      <Animated.View
        style={[
          {
            width: "100%",
            borderRadius: 20,
            top: 4,
            position: "absolute",
            zIndex: 100,
            justifyContent: "center",
            alignItems: "center",
          },
          indicatorStyle,
        ]}
      >
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#F45E00FF",
          }}
        />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const icon = options.tabBarIcon?.({
          focused: isFocused,
          color: isFocused ? colors.primary : colors.text,
          size: 24,
        });

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            route.name === "DarkMode"
              ? switchTheme({
                  switchThemeFunction: () => {
                    toggleMode();
                  },
                  animationConfig: {
                    type: "circular",
                    duration: 900,
                    startingPoint: {
                      cxRatio: 0.5,
                      cyRatio: 0.5,
                    },
                  },
                })
              : navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <View
            key={route.key}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
            ref={(el) => (refs.current[index] = el)}
          >
            <PlatformPressable
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              android_ripple={{ color: "transparent" }}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onTouchStart={vibrateAnimatedEnd}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {icon}
              </View>

              {/* <Text style={{ color: isFocused ? colors.primary : colors.text }}>
                    {label}
                  </Text> */}
            </PlatformPressable>
          </View>
        );
      })}
    </View>
  );
}
