import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  Alert,
  BackHandler,
  Platform,
  Text,
  useWindowDimensions,
} from "react-native";
import CustomBackground from "./CustomBg";
import { Easing, SharedValue, useSharedValue } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useAddWalletBottomSheet,
  useViewWalletBottomSheet,
} from "../../store/ui";
import WebView from "react-native-webview";

type CustomBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  animatedPosition: SharedValue<number>;

  // add your custom props here
};
export const ViewWalletBottomSheet: React.FC<CustomBottomSheetProps> = ({
  bottomSheetModalRef,
  animatedPosition,
}) => {
  const { height, width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const percentage = Platform.OS === "ios" ? "90.5" : "94";
  console.log("🚀 ~ file: bottomSheet.tsx:27 ~ percentage:", percentage);

  console.log("🚀 ~ file: bottomSheet.tsx:26 ~ top:", top, height);
  const toggleSheetState = useViewWalletBottomSheet((state) => state.setSate);
  const sheetState = useViewWalletBottomSheet((state) => state.wallet);
  const snapPoints = useMemo(() => ["25%", `${percentage}%`], []);
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
      toggleSheetState(null);
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
      index={1}
      backgroundComponent={CustomBackground}
      handleIndicatorStyle={{ display: "none" }}
      animatedPosition={animatedPosition}
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <WebView
          source={{ uri: `https://solscan.io/account/${sheetState?.address}` }}
          style={{ width: width, height: "100%" }}
        />
      </BottomSheetScrollView>
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
    backgroundColor: "#011F21FF",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
});
