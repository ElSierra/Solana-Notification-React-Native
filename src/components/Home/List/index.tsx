import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  Share,
  useWindowDimensions,
} from "react-native";
import AddWallet from "../Wallet/AddWallet";
import { WalletContainer } from "../Wallet/walletContainer";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useHideTabBar } from "../../../store";

type ListProps = {
  offsetY: SharedValue<number>;
  offsetHeight: SharedValue<number>;
};
export const List: React.FC<ListProps> = ({ offsetY, offsetHeight }) => {
  const scrollHeight = useSharedValue(0);
  const { height } = useWindowDimensions();
  // useAnimatedReaction(
  //   () =>scrollingUp.value,
  //   (value) => {
  //       if (value) {
  //           runOnJS(hideTabBar)(true);
  //       } else {
  //           runOnJS(hideTabBar)(false);
  //       }
  //   },
  //   [scrollingUp]
  // );

  //   useAnimatedReaction(
  //     () => {
  //       return scrollingUp.value;
  //     },
  //     (value) => {
  //       console.log("🚀 ~ file: index.tsx:47 ~ List ~ value:", value);
  //         if (value) {
  //         runOnJS(hideTabBar)(true);
  //         } else {
  //             runOnJS(hideTabBar)(false);
  //         }
  //     },
  //     [scrollingUp,]
  //   );

  const animListStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            offsetY.value,
            [0, offsetHeight.value],
            [0, -(50)],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    offsetY.value = event.contentOffset.y;
    offsetHeight.value = event.contentSize.height - scrollHeight.value;
    // const currentScrollY = event.contentOffset.y;
    // if (currentScrollY > prevOffsetY.value) {
    //   !hideTabBarState && runOnJS(hideTabBar)(true);
    // } else if (currentScrollY < prevOffsetY.value) {
    //   hideTabBarState && runOnJS(hideTabBar)(false);
    // }
    // prevOffsetY.value = currentScrollY;
  });

  return (
    <Animated.View style={[]}>
      <Animated.FlatList
        onLayout={(event) => {
          scrollHeight.value = event.nativeEvent.layout.height;
        }}
        style={animListStyle}
        onScroll={scrollHandler}
        decelerationRate={"fast"}
        fadingEdgeLength={100}
        contentContainerStyle={{ padding: 10, gap: 10, paddingBottom: 400 }}
        data={[1, 2, 3, 45, 6, 7, 8, 9, 0]}
        ListFooterComponent={() => <AddWallet />}
        scrollEventThrottle={16}
        renderItem={({ item }) => <WalletContainer />}
      />
      {Platform.OS === "ios" && (
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.4)"]}
          style={styles.gradientBottom}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    padding: 20,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  gradientBottom: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 999,
  },
  gradientTop: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 999,
  },
});
