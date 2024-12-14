import { View, Text, Pressable, Platform } from "react-native";
import React, { useMemo } from "react";
import LinearBackground from "../../global/LinearBackground";
import { LinearGradient } from "expo-linear-gradient";
import { useIsDarkMode } from "../../../hooks/getMode";
import Header from "./Header";
import { DrawerItem } from "@react-navigation/drawer";
import { DarkModeIcon } from "../CustomTabBar/DarkModeIcon";
import { useMode } from "../../../store/ui";
import switchTheme from "react-native-theme-switch-animation";
import { LogoutIcon } from "../../global/icons";
import LogoutIconComponent from "./LogoutIcon";
import { useNavigation } from "@react-navigation/native";
import { useAuth, useTokenStore } from "../../../store/auth";
import { useWalletStore } from "../../../store/wallet";
import { queryClient } from "../../../util/queryClient";
import { deleteValueFor } from "../../../util/secureStore";

const CustomDrawer = () => {
  const isDarkMode = useIsDarkMode();
  const bgColor = !isDarkMode ? "white" : "black";
  const toggleDarkMode = useMode((state) => state.toggleMode);
  const color = !isDarkMode ? "black" : "white";
  const borderColor = isDarkMode ? "white" : "transparent";
  const setAuth = useAuth((state) => state.setAuth);
  const clearToken = useTokenStore((state) => state.clearToken);
  const addDummyData = useWalletStore((state) => state.addDummyData);

  const walletAdjustSol = useWalletStore((state) => state.adjustSOL);
  console.log(
    "🚀 ~ file: index.tsx:14 ~ LinearBackground ~ walletAdjustSol:",
    walletAdjustSol
  );

  const getColorArray = useMemo(() => {
    if (walletAdjustSol === "up") {
      return isDarkMode
        ? ["#002327FF", "#00000000"]
        : ["#E6FCFEFF", "#FFFFFF00"];
    }
    return isDarkMode ? ["#270600FF", "#00000000"] : ["#FEE6E6FF", "#FFFFFF00"];
  }, [walletAdjustSol, isDarkMode]);

  return (
    <View
      style={{ flex: 1, backgroundColor: "", justifyContent: "space-between" }}
    >
      {/* <LinearBackground /> */}
      <LinearGradient
        colors={getColorArray as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          width: "100%",
          zIndex: 0,
        }}
      />
      <View style={{ paddingTop: 30 }}>
        <Header />
      </View>

      <View
        style={{
          padding: 20,
          marginBottom: Platform.OS === "ios" ? 24 * 4 : 24 * 2.4,
          gap: 10,
        }}
      >
        <Pressable
          onPress={() => {
            switchTheme({
              switchThemeFunction: () => {
                toggleDarkMode();
              },
              animationConfig: {
                type: "circular",
                duration: 900,
                startingPoint: {
                  cxRatio: 0.5,
                  cyRatio: 0.5,
                },
              },
            });
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: bgColor,

            borderWidth: 1,
            borderColor,
            gap: 14,
            borderRadius: 999,
            padding: 10,
          }}
        >
          <Text
            style={{
              color,
              fontFamily: "Satoshi-Regular",
              includeFontPadding: false,
              fontSize: 14,
            }}
          >
            Switch
          </Text>

          <DarkModeIcon size={20} />
        </Pressable>
        <Pressable
          onPress={() => {
            setAuth(null);
            clearToken();
            queryClient.removeQueries();
            deleteValueFor("token");
          }}
          onLongPress={() => {
            addDummyData();
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: bgColor,
            borderWidth: 1,
            borderColor,
            gap: 14,
            borderRadius: 999,
            padding: 10,
          }}
        >
          <Text
            style={{
              color,
              fontFamily: "Satoshi-Regular",
              includeFontPadding: false,
              fontSize: 14,
            }}
          >
            Logout
          </Text>

          <LogoutIconComponent />
        </Pressable>
      </View>
    </View>
  );
};

export default CustomDrawer;
