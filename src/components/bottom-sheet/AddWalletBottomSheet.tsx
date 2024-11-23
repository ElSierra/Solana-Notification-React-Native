import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  BackHandler,
  Keyboard,
  Platform,
  Text,
  useWindowDimensions,
} from "react-native";
import CustomBackground from "./CustomBg";
import { Easing, SharedValue, useSharedValue } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAddWalletBottomSheet } from "../../store/ui";
import CreateWallet from "../createWallet/CreateWallet";
import * as Crypto from "expo-crypto";

type CustomBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  animatedPosition: SharedValue<number>;

  // add your custom props here
};
export const AddWalletBottomSheet: React.FC<CustomBottomSheetProps> = ({
  bottomSheetModalRef,
  animatedPosition,
}) => {
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [enableDismissOnClose, setEnableDismissOnClose] = useState(true);
  const percentage = Platform.OS === "ios" ? "90.5" : "94";
  console.log("🚀 ~ file: bottomSheet.tsx:27 ~ percentage:", percentage);

  console.log("🚀 ~ file: bottomSheet.tsx:26 ~ top:", top, height);
  const toggleSheetState = useAddWalletBottomSheet((state) => state.toggle);
  const snapPoints = useMemo(() => [`${percentage}%`], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <>
        <BottomSheetBackdrop
          {...props}
          opacity={0.4}
          pressBehavior={"close"}
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
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <CreateWallet />
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
