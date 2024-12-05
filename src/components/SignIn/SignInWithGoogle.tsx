import { Image } from "expo-image";
import { ActivityIndicator, PixelRatio, Text, View } from "react-native";
import { Theme } from "../../constants/Theme";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useIsDarkMode } from "../../hooks/getMode";
import { useNavigation } from "@react-navigation/native";
import { SignInWithGoogleAsync } from "../../util/signInWithGoogle";
import { safeAsync } from "../../util/safeAsync";
import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { save } from "../../util/secureStore";

type SignInWithGoogleProps = {
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
};
export const SignWithGoogleAsync: FC<SignInWithGoogleProps> = ({translateY,opacity}) => {
  const scale = useSharedValue(1);
  const isDarkMode = useIsDarkMode();
  const setAuth = useAuth((state) => state.setAuth);
  const textColor = !isDarkMode ? "white" : "black";
  const bg = !isDarkMode ? "black" : "white";
  const [isLoading, setIsLoading] = useState(false);
  const [idToken, setIdToken] = useState<string | null>(null);

  //useRefetchonFocus

  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/auth/google`, undefined, {
          headers: {
            "Content-Type": "application/json",
            id_token: idToken,
          },
        })
        .then((res) => res.data.data),
    enabled: !!idToken,
  });
  console.log(isPending, error, data);

  useEffect(() => {
    if (data) {
      setAuth("user", {
        name: data.name,
        email: data.email,
        id: data.id,
        picture: data.picture,
      });
      save("token", data.token);
    }
  }, [data]);
  const handleButtonPress = async () => {
    setIsLoading(true);
    const [result, error] = await safeAsync(() => SignInWithGoogleAsync());

    if (error) {
      setIsLoading(false);
      console.log("error", error);
    }
    if (result) {
      console.log(result);
      setIdToken(result.data.idToken);
      setIsLoading(false);
    }
  };
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: scale.value }, { scaleY: scale.value },{translateY: translateY.value}],
      opacity: opacity.value,
    };
  });
  const tap = Gesture.Tap()
    .onBegin((e) => {
      "worklet";
    })
    .onStart((e) => {
      "worklet";

      // runOnJS(navigation.navigate)("Tabs" as any);
    })
    .onEnd(() => {
      "worklet";

      runOnJS(handleButtonPress)();
    });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        style={[
          {
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: bg,
            padding: 20,
            borderRadius: 9999,
            width: "100%",
            gap: 10,
            alignItems: "center",
          },
          style,
        ]}
      >
        {isLoading || isFetching ? (
          <ActivityIndicator size="small" color={textColor} />
        ) : (
          <>
            <Image
              source={require("../../../assets/images/google.svg")}
              style={{ height: 20, width: 20 }}
            />
            <Text
              style={{ color: textColor, fontFamily: Theme.fonts.SatoshiBold }}
            >
              Continue With Google
            </Text>
          </>
        )}
      </Animated.View>
    </GestureDetector>
  );
};
