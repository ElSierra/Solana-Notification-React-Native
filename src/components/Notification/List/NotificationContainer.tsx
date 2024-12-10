import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { DownIcon, UpIcon } from "../../global/icons";
import { useIsDarkMode } from "../../../hooks/getMode";
import { Theme } from "../../../constants/Theme";
import getRelativeTime from "../../../util/getRelativeTime";
import { useRef, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type NotificationContainerProps = {
  id: string;
  title: string;
  message: string;
  type: "receive" | "sent";
  createdAt: string;
  walletName: string;
};
export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  id,
  title,
  message,
  type,
  createdAt,
  walletName,
}) => {
  const isDarkMode = useIsDarkMode();
  const backgroundColor = isDarkMode ? "#262626FF" : "#D2D2D2FF";
  const textColor = isDarkMode ? "white" : "black";
  const [expanded, setExpanded] = useState(false);
  // Shared value for height
  const height = useSharedValue(75); // Initial height for 2 lines of text

  const toggleExpand = () => {
    if (!expanded) {
      setExpanded(!expanded);
    }
    height.value = expanded
      ? withTiming(75, { duration: 300 }, () => {
          runOnJS(setExpanded)(!expanded);
        })
      : withTiming(95, { duration: 300 }, () => {});
  };

  const animatedHeightStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <Pressable onPress={toggleExpand}>
      <Animated.View
        style={[
          {
            padding: 10,
            borderRadius: 20,
            width: "100%",
            flexDirection: "row",
            backgroundColor,
            alignItems: "center",
            gap: 5,
          },
          animatedHeightStyle,
        ]}
      >
        <View>
          {type === "sent" && <UpIcon color={"#C86E00FF"} size={60} />}
          {type === "receive" && <DownIcon color={"#2AB200FF"} size={60} />}
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",

              alignItems: "center",
            }}
          >
            <View
              style={{
                padding: 2,
                backgroundColor: isDarkMode ? "#024D49FF" : "#04B675FF",
                borderRadius: 10,
              }}
            >
              <Text
                ellipsizeMode="tail"
                style={{
                  fontFamily: "Satoshi-Regular",
                  color: textColor,
                  fontSize: 10,
                  includeFontPadding: false,
                }}
              >
                Wallet: {walletName}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: textColor,
                  fontFamily: Theme.fonts.SatoshiLight,
                }}
              >
                {getRelativeTime(createdAt)}
              </Text>
            </View>
          </View>
          <Text
            selectionColor={textColor}
            numberOfLines={expanded ? 3 : 2}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: textColor,
              fontFamily: Theme.fonts.SatoshiRegular,
            }}
          >
            {message}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};
