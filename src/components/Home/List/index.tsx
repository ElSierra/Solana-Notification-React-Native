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
  LinearTransition,
  runOnJS,
  SequencedTransition,
  SharedValue,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useHideTabBar } from "../../../store/ui";
import { data } from "../../../data/wallet";
import { useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useWalletStore } from "../../../store/wallet";
import { emojis } from "../../../data/emoji";
import { useIsDarkMode } from "../../../hooks/getMode";
import { useNavigation } from "@react-navigation/native";
import React from "react";

type ListProps = {};
const renderItem = ({
  item,
}: {
  item: {
    id: string;
    walletName: string;
    walletAddress: string;
    emoji: number;
    balance?: number;
  };
}) => {
  return <WalletContainer {...item} />;
};

export const List: React.FC<ListProps> = () => {
  const deleteAllWallets = useWalletStore((state) => state.deleteAllWallets);
  const walletList = useWalletStore((state) => state.walletData);
  useEffect(() => {

    console.log("rendering list");
  }, []);
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

  // const scrollHandler = useAnimatedScrollHandler((event) => {
  //   offsetY.value = event.contentOffset.y;

  //   offsetHeight.value = event.contentSize.height - scrollHeight.value;

  //   // const currentScrollY = event.contentOffset.y;

  //   // if (currentScrollY > prevOffsetY.value) {
  //   //   !hideTabBarState && runOnJS(hideTabBar)(true);
  //   // } else if (currentScrollY < prevOffsetY.value) {
  //   //   hideTabBarState && runOnJS(hideTabBar)(false);
  //   // }
  //   // prevOffsetY.value = currentScrollY;
  // });

  return (
    <Animated.View
      style={{
        flex: 1,
      }}
    >
      <Animated.FlatList
        // onLayout={(event) => {
        //   scrollHeight.value = event.nativeEvent.layout.height;
        // }}
        // style={[animListStyle]}
        //onScroll={scrollHandler}

        showsVerticalScrollIndicator={false}
        fadingEdgeLength={100}
        //performance settings
        // itemLayoutAnimation={SequencedTransition}
        // removeClippedSubviews
        // initialNumToRender={20}
        // estimatedItemSize={100}
        //performance settings
        // ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        removeClippedSubviews
        contentContainerStyle={{ padding: 10, paddingBottom: 400 }}
        data={walletList}
        ListFooterComponent={() => <AddWallet />}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
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

export const MemoizedList = React.memo(List);
