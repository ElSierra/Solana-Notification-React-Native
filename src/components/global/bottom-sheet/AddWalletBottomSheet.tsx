import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  BackHandler,
  Keyboard,
  Platform,
  Text,
  useWindowDimensions,
} from "react-native";
import CustomBackground from "./CustomBg";
import Animated, {
  Easing,
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAddWalletBottomSheet } from "../../../store/ui";
import CreateWallet from "../createWallet/CreateWallet";

type CustomBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  animatedPosition: SharedValue<number>;

  // add your custom props here
};
const AddWalletBottomSheet: React.FC<CustomBottomSheetProps> = ({
  bottomSheetModalRef,
  animatedPosition,
}) => {
  "use no memo";
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [enableDismissOnClose, setEnableDismissOnClose] = useState(true);
  const percentage = Platform.OS === "ios" ? "90.5" : "94";
  console.log("🚀 ~ file: bottomSheet.tsx:27 ~ percentage:", percentage);
  const closhingSheet = useSharedValue(true);
  console.log("🚀 ~ file: bottomSheet.tsx:26 ~ top:", top, height);
  const toggleSheetState = useAddWalletBottomSheet((state) => state.toggle);
  const snapPoints = useMemo(() => [`${percentage}%`], []);
  const opacity = useSharedValue(1);
  const animatedIndex = useSharedValue(0);
  const renderBackdrop = useCallback(
    (props: any) => (
      <>
        <BottomSheetBackdrop
          {...props}
          opacity={0.4}
          pressBehavior={"close"}
          onPress={() => {
            console.log("backdrop pressed");
          }}
          disappearsOnIndex={-1}
          appearsOnIndex={2}
        />
      </>
    ),
    []
  );

  useEffect(() => {
    const backAction = () => {
      bottomSheetModalRef.current?.dismiss();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const sheetChange = useSharedValue(0);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    sheetChange.value = index;
    if (index === -1) {
      toggleSheetState();
    }
  }, []);

  const styleView = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedIndex.value, [-0.9, 0], [0, 1]),
    };
  });
  

  return (
    <BottomSheetModal
      animationConfigs={{
        overshootClamping: true,
        stiffness: 50,
        clamp: {
          min: 100,
          max: 400,
        },
      }}
      ref={bottomSheetModalRef}
      keyboardBehavior="interactive"
      //@ts-ignore
      enableDismissOnClose
      enableDynamicSizing={true}
      keyboardBlurBehavior="none"
      android_keyboardInputMode="adjustPan"
      index={1}
      backgroundComponent={CustomBackground}
      handleIndicatorStyle={{ display: "none" }}
      animatedPosition={animatedPosition}
      animatedIndex={animatedIndex}
      snapPoints={snapPoints}
      onAnimate={(from, to) => {
        console.log("from", from);
        console.log("to", to);
        if (to ===1 ){
          console.log("tosasa", to);
        }

      }}
      
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Animated.View
          style={[
            {
              height: "100%",
              width: "100%",
            },
            styleView,
          ]}
        >
          <CreateWallet />
        </Animated.View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,

    borderRadius: 0,
    alignItems: "center",
  },
});

export default memo(AddWalletBottomSheet);
