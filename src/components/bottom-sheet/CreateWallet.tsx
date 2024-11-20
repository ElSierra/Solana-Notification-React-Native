import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Modal,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { emojis } from "../../data/emoji";
import { getMaxColumns } from "../../util/getMaxColumns";
import { BlurView } from "expo-blur";
import { Theme } from "../../constants/Theme";
import EmojiContainer from "./EmojiContainer";

export default function CreateWallet() {
  const [emojiIdx, setEmoji] = useState(9);
  const [showList, setShowList] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { width, height } = useWindowDimensions();

  const getMaxColumn = useMemo(() => {
    return getMaxColumns(width * 0.9, 40);
  }, [width]);

  const getEmojiIndex = useMemo(() => {
    return emojis.findIndex((emoji) => emojiIdx === emoji.id);
  }, [emojiIdx]);
  useEffect(() => {
    if (modalVisible) {
      setTimeout(
        () => {
          setShowList(true);
        },

        1000
      );
      return;
    }
    setShowList(false);
  }, [modalVisible]);

  const handlePress = (idx: number) => {
    setEmoji(idx);
    setModalVisible(false);
  };
  const renderItem = ({
    item,
  }: {
    item: { emoji: string; name: string; id: number };
  }) => {
    return <EmojiContainer item={item} onPress={handlePress} />;
  };
  return (
    <>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            height: height + 40,
            width,
            backgroundColor: "#05376200",
          }}
          onPress={() => {
            setModalVisible(false);
          }}
        />
        <View style={styles.centeredView}>
          <View
            style={[
              {
                width: width * 0.9,
                backgroundColor: "#151515FF",
                height: 200,
                borderRadius: 20,
                padding: 10,
                elevation: 40,
              },
            ]}
          >
            {/* <Text style={styles.modalText}>Hello World!</Text> */}

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}

            
              <FlatList
                data={emojis}
                showsVerticalScrollIndicator={false}
                numColumns={getMaxColumn}
                contentContainerStyle={{}}
                // estimatedItemSize={100}
                // estimatedListSize={{
                //   height: 200,
                //   width: width * 0.9,
                // }}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
          
          </View>
        </View>
      </Modal>
      <View
        style={{
          height: "100%",
          width: "100%",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "satoshi-black", color: "white" }}>
          Create Wallet
        </Text>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}
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
                tint="dark"
                style={{ position: "absolute", height: "100%", width: "100%" }}
              />
            </View>
            <View style={{}}>
              <Text
                style={{ fontFamily: "windows", color: "white", fontSize: 60 }}
              >
                {emojis[getEmojiIndex].emoji}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
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
