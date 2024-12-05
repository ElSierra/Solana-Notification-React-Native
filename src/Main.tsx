import {
  View,
  Text,
  useWindowDimensions,
  Platform,
  Touchable,
  TouchableOpacity,
} from "react-native";
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
} from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  useAddWalletBottomSheet,
  useEmojiBottomSheet,
  useMode,
} from "./store/ui";
import AddWalletBottomSheet from "./components/global/bottom-sheet/AddWalletBottomSheet";

import { LinearGradient } from "expo-linear-gradient";

import { RootStack } from "./navigation/RootStackNavigtaion";
import { useTokenStore } from "./store/auth";
import { getValueFor } from "./util/secureStore";
type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

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
          scaleX: interpolate(
            animatedValue.value,
            [height / 1.5, top],
            [0.974, scaleValue]
          ),
        },
        {
          scaleY: interpolate(
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

  const Mode = useMode((state) => state.mode);
  const hydrateToken = async () => {
    const token = await getValueFor("token");
    if (token) {
      useTokenStore.setState({ token });
    }
  };
  
  useEffect(() => {
    hydrateToken();
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        style={Mode === "dark" ? "light" : "dark"}
        backgroundColor="transparent"
      />
      <BottomSheetModalProvider>
        <AddWalletBottomSheet
          animatedPosition={animatedPosition}
          bottomSheetModalRef={bottomSheetModalRef}
        />

        <Animated.View
          style={[
            { flex: 1, backgroundColor: "#00000000", overflow: "hidden" },
            animStyle,
          ]}
        >
          <Navigation />
        </Animated.View>
      </BottomSheetModalProvider>
    </>
  );
}
