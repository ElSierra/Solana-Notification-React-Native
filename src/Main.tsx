import { View, Text, useWindowDimensions, Platform } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import Animated, {
  clamp,
  FadeIn,
  FadeInUp,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  createStaticNavigation,
  StaticParamList,
  useLinkBuilder,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Home from "./Screens/Home";
import Explore from "./Screens/Explore";
import { PlatformPressable } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import {
  DiscoverIconFocused,
  DiscoverIconUnfocused,
  ExploreIcon,
  HomeFocused,
  HomeIcon,
  LikeIconFocused,
  LikeIconUnfocused,
  ProfileIconFocused,
  ProfileIconUnfocused,
} from "./components/global/icons";
import CustomTabBar from "./components/CustomTabBar";
import { AnimatedIcon } from "./components/CustomTabBar/AnimatedIcon";
import { Theme } from "./constants/Theme";
import { StatusBar } from "expo-status-bar";
import Likes from "./Screens/EmojiList";
import Profile from "./Screens/Profile";
import { ViewWallet } from "./Screens/ViewWallet";
import { Canvas, vec, Rect, LinearGradient } from "@shopify/react-native-skia";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  useAddWalletBottomSheet,
  useEmojiBottomSheet,
  useViewWalletBottomSheet,
} from "./store/ui";
import { AddWalletBottomSheet } from "./components/bottom-sheet/AddWalletBottomSheet";

import EmojiList from "./Screens/EmojiList";
import { Toaster } from "sonner-native";

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
const MyTabs = createBottomTabNavigator({
  tabBar: (props) => <CustomTabBar {...props} />,

  screenOptions: {
    headerShown: false,
    animation: "shift",
    sceneStyle: {
      backgroundColor: "transparent",
    },

    //background color of page
  },

  screens: {
    Home: {
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <AnimatedIcon
            focused={focused}
            size={size}
            FocusedIcon={HomeFocused}
            UnfocusedIcon={HomeIcon}
          />
        ),
      },
      screen: Home,
    },
    Explore: {
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <AnimatedIcon
            focused={focused}
            size={size}
            FocusedIcon={DiscoverIconFocused}
            UnfocusedIcon={DiscoverIconUnfocused}
          />
        ),
      },
      screen: Explore,
    },
    // Likes: {
    //   options: {
    //     tabBarIcon: ({ color, size, focused }) => (
    //       <AnimatedIcon
    //         focused={focused}
    //         size={size}
    //         FocusedIcon={LikeIconFocused}
    //         UnfocusedIcon={LikeIconUnfocused}
    //       />
    //     ),
    //   },
    //   screen: Likes,
    // },

    // Profile: {
    //   options: {
    //     tabBarIcon: ({ color, size, focused }) => (
    //       <AnimatedIcon
    //         focused={focused}
    //         size={size}
    //         FocusedIcon={ProfileIconFocused}
    //         UnfocusedIcon={ProfileIconUnfocused}
    //       />
    //     ),
    //   },
    //   screen: Profile,
    // },
  },
});
const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    contentStyle: {
      backgroundColor: "#11001FFF",
    },
  },

  screens: {
    Tabs: MyTabs,
    EmojiList: {
      screen: EmojiList,
      options: {
        presentation: "modal",
      },
    },
    ViewWallet: {
      screen: ViewWallet,
      options: {
        presentation: "formSheet",
        headerShown: false,
        sheetAllowedDetents: [0.9],
        sheetCornerRadius: 20,
        sheetExpandsWhenScrolledToEdge: true,
        sheetElevation: 0,
        contentStyle: {
          backgroundColor: "#11001FFF",
        },
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);
export default function Main() {
  const { top } = useSafeAreaInsets();
  const CORNER_RADIUS = 20;
  console.log("🚀 ~ file: index.tsx:36 ~ Main ~ CORNER_RADIUS:", CORNER_RADIUS);

  console.log("🚀 ~ file: index.tsx:30 ~ Main ~ top:", top);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const viewBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { width, height } = useWindowDimensions();
  console.log("🚀 ~ file: App.tsx:27 ~ App ~ height:", height);

  const bottomSheetState = useAddWalletBottomSheet((state) => state.open);
  const viewBottomSheetState = useEmojiBottomSheet((state) => state.open);

  // variables

  // callbacks

  useEffect(() => {
    if (bottomSheetState) {
      bottomSheetModalRef.current?.present();
    }
  }, [bottomSheetState]);

  const animatedPosition = useSharedValue(0);
  const animatedValue = useSharedValue(height);
  const scaleValue = useMemo(
    () => (Platform.OS === "android" ? 0.91 : 0.855),
    []
  );

  const animStyle = useAnimatedStyle(() => {
    return {
      borderTopLeftRadius:
        Platform.OS === "ios"
          ? interpolate(animatedValue.value, [height / 1.5, top], [40, 10])
          : interpolate(
              animatedValue.value,
              [height / 1.5, top],
              [CORNER_RADIUS / 2.5, 10]
            ),
      borderTopRightRadius:
        Platform.OS === "ios"
          ? interpolate(animatedValue.value, [height / 1.5, top], [40, 10])
          : interpolate(
              animatedValue.value,
              [height / 1.5, top],
              [CORNER_RADIUS / 2.5, 10]
            ),
      transform: [
        // {
        //   translateY: interpolate(animatedValue.value, [height, 50], [0, 30]),
        // },

        {
          scale: interpolate(
            animatedValue.value,
            [height / 1.5, top],
            [0.974, scaleValue]
          ),
        },
      ],
    };
  });

  // renders

  useAnimatedReaction(
    () => animatedPosition.value,
    (position) => {
      if (position === 0) {
        animatedValue.value = withTiming(height);
        return;
      }
      animatedValue.value = clamp(position, 0, height);
    },
    []
  );

 
  return (
    <>
      
      <StatusBar
        animated={true}
        style={"light"}
        backgroundColor="transparent"
      />
      <BottomSheetModalProvider>
        <AddWalletBottomSheet
          animatedPosition={animatedPosition}
          bottomSheetModalRef={bottomSheetModalRef}
        />

        <Animated.View
          style={[
            { flex: 1, backgroundColor: "black", overflow: "hidden" },
            animStyle,
          ]}
        >
          <Navigation />
        
        </Animated.View>
        <Toaster />
      </BottomSheetModalProvider>
    </>
  );
}
