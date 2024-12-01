
import { View ,StyleSheet} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { TrashIcon } from "../../global/icons";

export default function RightAction(prog: SharedValue<number>, drag: SharedValue<number>, handleDeleteWallet: () => void) {
    // eslint-disable-next-line react-compiler/react-compiler
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 80 }],
        opacity: prog.value,
      };
    });

    const gesture = Gesture.Tap()
    .onBegin(() => {
      // scale.value = withTiming(0.9, { duration: 100 }, (finished) => {
      //   // if (finished) {
      //   //   scale.value = withDelay(0, withTiming(1, { duration: 100 }));
      //   // }
      // });
      // opacity.value = withTiming(0.5, { duration: 100 }, (finished) => {
      //   if (finished) {
      //     opacity.value = withDelay(0, withTiming(1, { duration: 100 }));
      //   }
      // });
    })
    .onStart(() => {
      runOnJS(handleDeleteWallet)();
    });


    return (
      <Animated.View style={[styleAnimation, { flexDirection: "row" }]}>
        <View style={{ width: 5, height: 10 }} />

        <GestureDetector gesture={gesture}>
          <View style={styles.rightAction}>
            <View
              style={{
                backgroundColor: "#EC0505FF",
                height: 75,
                marginTop: 10,
                borderRadius: 20,

                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TrashIcon size={30} color="white" />
            </View>
          </View>
        </GestureDetector>
      </Animated.View>
    );
  }

  const styles = StyleSheet.create({
    rightAction: {
      width: 75,
      height: 90,
  
      justifyContent: "center",
      alignItems: "center",
    },
    separator: {
      width: "100%",
      borderTopWidth: 1,
    },
    swipeable: {
      height: 90,
  
      width: "100%",
    },
  });
  