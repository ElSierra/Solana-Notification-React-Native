import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateWallet from "../components/global/createWallet/CreateWallet";
import { useIsNotSignedIn, useIsSignedIn } from "../hooks/isSignedIn";
import EmojiList from "../screen/EmojiList";
import SignIn from "../screen/SignIn";
import { ViewWallet } from "../screen/ViewWallet";
import { BottomTabNav, MyTabs } from "./BottomTabNavigation";

export const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    contentStyle: {
      backgroundColor: "black",
    },
  },

  screens: {
    SignIn: {
      if: useIsNotSignedIn,
      screen: SignIn,
      options: {
        animation: "simple_push",
      },
    },
    Tabs: {
      if: useIsSignedIn,
      screen: BottomTabNav,
      options: {
        animation: "simple_push",
      },
    },

    EmojiList: {
      screen: EmojiList,
      options: {
        presentation: "modal",
      },
    },
    CreateWallet: {
      screen: CreateWallet,
      options: {
        presentation: "formSheet",
      },
    },
    ViewWallet: {
      screen: ViewWallet,
      options: {
        presentation: "formSheet",
        headerShown: false,
        sheetAllowedDetents: [0.9],
        sheetCornerRadius: 20,
        sheetExpandsWhenScrolledToEdge: true,
        sheetElevation: 0,
        contentStyle: {
          backgroundColor: "black",
        },
      },
    },
  },
});
