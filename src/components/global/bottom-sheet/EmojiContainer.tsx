import { View, Text, Pressable } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
function EmojiContainer({
  item,
  onPress,
}: {
  item: { emoji: string; name: string; id: number };
  onPress: (idx: number) => void;
}) {
  return (
    <Pressable
      onPress={() => {
        onPress(item.id);
        console.log("pressed");
      }}
    >
      <View
        style={[
          {
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "windows",
          }}
        >
          {item.emoji}
        </Text>
      </View>
    </Pressable>
  );
}

export default React.memo(EmojiContainer);
