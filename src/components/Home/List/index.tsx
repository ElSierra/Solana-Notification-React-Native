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
import WalletContainer from "../Wallet/walletContainer";
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
import { useHideTabBar } from "../../../store/ui";
import { data } from "../../../data/wallet";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";

type ListProps = {
  offsetY: SharedValue<number>;
  offsetHeight: SharedValue<number>;
};
const renderItem = ({
  item,
}: {
  item: {
    id: number;
    name: string;
    balance: string;
    emoji: string;
    address: string;
  };
}) => {
  return <WalletContainer {...item} />;
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
            [0, 400],
            [0, -100],
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
    <View
      style={{
        flex: 1,
      }}
    >
      <FlashList
        // onLayout={(event) => {
        //   scrollHeight.value = event.nativeEvent.layout.height;
        // }}
        // style={[animListStyle]}
        //onScroll={scrollHandler}

        showsVerticalScrollIndicator={false}
        fadingEdgeLength={100}
        //performance settings
        removeClippedSubviews
        estimatedItemSize={100}
        //performance settings
        ItemSeparatorComponent={() => (
          <View style={{ height: 10}} />
        )}
        contentContainerStyle={{ padding: 10, paddingBottom: 400 }}
        data={data}
        ListFooterComponent={() => <AddWallet />}
        scrollEventThrottle={16}
        renderItem={renderItem}
      />
      {Platform.OS === "ios" && (
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.4)"]}
          style={styles.gradientBottom}
        />
      )}
    </View>
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
