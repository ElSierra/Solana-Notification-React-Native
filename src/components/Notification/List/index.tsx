import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  Share,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiClient from "../../../util/axiosInstance";
import { useTokenStore } from "../../../store/auth";
import { NotificationContainer } from "./NotificationContainer";

type ListProps = {
  refetch: () => void;
  isFetching: boolean;
  animatedPosition: SharedValue<number>;
  scrollHeight: SharedValue<number>;
  data: any;
};
const renderItem = ({
  item,
}: {
  item: {
    id: string;
    title: string;
    message: string;
    type: "receive" | "sent";
    createdAt: string;
    walletName: string;
  };
}) => {
  return <NotificationContainer {...item} />;
};

export const List: React.FC<ListProps> = ({
  refetch,
  isFetching,
  animatedPosition,
  scrollHeight,
  data,
}) => {
  "use no memo";

  const deleteAllWallets = useWalletStore((state) => state.deleteAllWallets);
  const walletList = useWalletStore((state) => state.walletData);

  const isTokenReady = useTokenStore((state) => state.isTokenReady);

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

  const listStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, scrollHeight.value],
            [0, -150],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    animatedPosition.value = event.contentOffset.y;
  });

  return (
    <Animated.View
      style={[
        {
          flex: 1,
        },
        listStyle,
      ]}
    >
      <Animated.FlatList
        onLayout={(event) => {
          scrollHeight.value = event.nativeEvent.layout.height;
        }}
        // style={[animListStyle]}
        onScroll={scrollHandler}
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
        contentContainerStyle={{ padding: 10, paddingBottom: 400, gap: 10 }}
        data={data}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              refetch();
            }}
            colors={["white", "green", "orange"]}
            progressBackgroundColor={"black"}
          />
        }
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
