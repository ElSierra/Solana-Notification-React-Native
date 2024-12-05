import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Modal,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { emojis } from "../../../data/emoji";
import { getMaxColumns } from "../../../util/getMaxColumns";
import { BlurView } from "expo-blur";
import { Theme } from "../../../constants/Theme";

import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Form from "./Form";
import { useIsDarkMode } from "../../../hooks/getMode";
import EmojiContainer from "../bottom-sheet/EmojiContainer";
import BottomSheet, {
  BottomSheetFlashList,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";

function CreateWallet() {
  const getRandomNumberFromRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const [emojiIdx, setEmoji] = useState(getRandomNumberFromRange(1, 100));
  const [showList, setShowList] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { width, height } = useWindowDimensions();

  const getMaxColumn = useMemo(() => {
    return getMaxColumns(width * 0.9, 40);
  }, [width]);
  const opacityInner = useSharedValue(0);
  const getEmojiIndex = useMemo(() => {
    return emojis.findIndex((emoji) => emojiIdx === emoji.id);
  }, [emojiIdx]);
  const handleCloseModal = () => {
    emojiContainerHeight.value = withTiming(
      0,
      {
        duration: 200,
        easing: Easing.bezier(0, 1, 0, 1),
      },
      () => {
        runOnJS(setModalVisible)(false);
        opacityInner.value = 0;
      }
    );
  };
  const handlePress = (idx: number) => {
    setEmoji(idx);
    handleCloseModal();
  };
  const renderItem = ({
    item,
  }: {
    item: { emoji: string; name: string; id: number };
  }) => {
    return <EmojiContainer item={item} onPress={handlePress} />;
  };
  const emojiContainerHeight = useSharedValue(0);
  const isDarkMode = useIsDarkMode();
  const scale = useSharedValue(1);

  const emojiStyleAnim = useAnimatedStyle(() => {
    return {
      height: emojiContainerHeight.value,
    };
  });
  const innerEmojiStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityInner.value,
    };
  });

  const handModalVisible = () => {
    setTimeout(() => {
      setModalVisible(true);
      opacityInner.value = withDelay(10, withSpring(1));
    }, 200);

    emojiContainerHeight.value = withTiming(
      200,
      { duration: 200, easing: Easing.bezier(0, 1, 0, 1) },
      (finished) => {}
    );
  };

  return (
    <>
      <View
        style={{
          height: "100%",
          width: "100%",
          gap: 10,
          position: "absolute",
          bottom: 0,
        }}
      >
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "Satoshi-Black",
              color: isDarkMode ? "white" : "black",
              fontSize: 20,
            }}
          >
            Create Wallet
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={handModalVisible}
            style={{
              borderRadius: 200,
              overflow: "hidden",
              height: 100,
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                justifyContent: "center",

                alignItems: "center",
                height: 100,
                width: 100,
              }}
            >
              <Text
                style={{ fontFamily: "windows", color: "white", fontSize: 60 }}
              >
                {emojis[getEmojiIndex].emoji}
              </Text>
              <BlurView
                experimentalBlurMethod="dimezisBlurView"
                intensity={60}
                tint={isDarkMode ? "dark" : "light"}
                style={{ position: "absolute", height: "100%", width: "100%" }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "windows",

                  fontSize: 60,
                }}
              >
                {emojis[getEmojiIndex].emoji}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Animated.View style={emojiStyleAnim}>
          {modalVisible && (
            <Animated.View
              style={[
                {
                  width: width * 0.9,

                  height: "100%",
                  borderRadius: 20,
                  padding: 10,
                  alignSelf: "center",
                },
                innerEmojiStyle,
              ]}
            >
              <BottomSheetFlatList
                data={emojis}
                showsVerticalScrollIndicator={false}
                numColumns={getMaxColumn}
                contentContainerStyle={{}}
                // estimatedListSize={{
                //   height: 200,
                //   width: width * 0.9,
                // }}
                fadingEdgeLength={200}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </Animated.View>
          )}
        </Animated.View>
        <Form emoji={emojiIdx} />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 200,
    width: 200,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default React.memo(CreateWallet);
