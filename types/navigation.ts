import type {
  NavigationProp,
  StaticParamList,
  StaticScreenProps,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  ViewWallet: { address: string };
};

export type HomeNavigationProp = NavigationProp<RootStackParamList, "Home">;
export type ViewWalletProp = NativeStackScreenProps<
  RootStackParamList,
  "ViewWallet"
>;
